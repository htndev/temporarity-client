import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DRAWER_WIDTH } from '../../common/constants/drawer.constant';

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
        <Typography variant="h6" noWrap component="div">
          {t('common.title')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
