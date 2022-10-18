import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DRAWER_WIDTH } from '../../common/constants/drawer.constant';
import { useAppSelector } from '../../store/hooks';
import { workspacesSelector } from '../../store/selectors/workspaces';
import { Navbar } from '../navbar/Navbar';
import { AppLink } from './AppLink';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const ListElement: FC<{
  title: string;
  url: string;
  isOpen: boolean;
  innerContent?: JSX.Element;
}> = ({ title, url, isOpen, children }) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: isOpen ? 'initial' : 'center',
        px: 2.5
      }}
    >
      <AppLink to={url}>
        {children}
        <ListItemText primary={title} />
      </AppLink>
    </ListItemButton>
  </ListItem>
);

export const Layout: FC = ({ children }) => {
  const { t } = useTranslation();
  const workspaces = useAppSelector(workspacesSelector);
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const renderWorkspaces = useCallback(
    () =>
      !isOpen ? (
        ''
      ) : (
        <List>
          {workspaces.map((workspace) => (
            <ListElement
              key={workspace.slug}
              title={workspace.name}
              url={`/workspaces/${workspace.slug}`}
              isOpen={isOpen}
            />
          ))}
        </List>
      ),
    [isOpen, workspaces]
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar isOpen={isOpen} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <AppLink to="/workspaces">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  width: '100%',
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <WorkspacesIcon />
                </ListItemIcon>
                <ListItemText primary={t('drawer.workspaces')} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </AppLink>
          </ListItem>
        </List>
        {renderWorkspaces()}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
