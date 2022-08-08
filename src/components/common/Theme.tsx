import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { frameworkTheme, GlobalStyles, THEME } from '../../common/config/theme.constant';

export const Theme: FC = ({ children }) => (
  <MuiThemeProvider theme={frameworkTheme}>
    <ThemeProvider theme={THEME}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </MuiThemeProvider>
);
