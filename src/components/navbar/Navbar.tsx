import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DRAWER_WIDTH } from '../../common/constants/drawer.constant';
import { LOGOUT } from '../../store/actions/auth';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/selectors/auth';
import { AppLink } from '../common/AppLink';

interface NavbarProps {
  isOpen: boolean;
  handleDrawerOpen: (value: boolean) => void;
}

interface AppBarProps {
  isOpen: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<AppBarProps>(({ theme, isOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(isOpen && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const Navbar: FC<NavbarProps> = ({ isOpen, handleDrawerOpen }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useAppSelector(userSelector);
  const firstLetters = useMemo(() => {
    const [firstName, lastName] = user?.fullName.split(' ') ?? [];

    return `${firstName?.[0]}${lastName?.[0]}`;
  }, [user?.fullName]);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  const closeMenu = () => {
    setIsOpenedMenu(false);
    setAnchor(null);
  };

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
    setIsOpenedMenu(true);
  };

  const onLogout = () => {
    closeMenu();
    dispatch(LOGOUT());
  };

  return (
    <AppBar position="fixed" isOpen={isOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpen(!isOpen)}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isOpen && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <AppLink to="/dashboard">
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={theme.palette.getContrastText(theme.palette.primary.main)}
          >
            {t('common.title')}
          </Typography>
        </AppLink>
        <Menu
          open={isOpenedMenu}
          onClose={closeMenu}
          anchorEl={anchor}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>{t('auth.button.logout.title')}</MenuItem>
        </Menu>
        <IconButton sx={{ marginLeft: 'auto' }} onClick={openMenu}>
          <Avatar src={String(user?.profilePicture)}>{firstLetters}</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
