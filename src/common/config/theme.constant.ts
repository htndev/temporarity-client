import { createTheme } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

export const GENERAL_COLORS = {
  black: '#28282B',
  darkRed: '#9A031E',
  red: '#EB5160',
  lightRed: '#DB7F8E',
  blue: '#4D6CFA',
  darkBlue: '#4381C1',
  pink: '#DBBBF5',
  lightPink: '#E5C1BD',
  darkPink: '#731963',
  lightBlue: '#DDF0FF',
  white: '#FFFCF9',
  gray: '#616161',
  orange: '#EB5E28',
  lightOrange: '#F4A261',
  darkOrange: '#C44536',
  cyan: '#33A1FD',
  darkCyan: '#2176FF',
  lightCyan: '#8AC4FF',
  green: '#43B929',
  lightGreen: '#7DD181',
  darkGreen: '#109648'
};

export const SPACING: { [k in `spacing${number}`]: string } = Array.from({
  length: 9
})
  .fill(0)
  .reduce((total: number[], _, index) => (index === 0 ? [4] : [...total, total[index - 1] + 4]), [])
  .reduce((total, spacing, index) => ({ ...total, [`spacing${index + 1}`]: `${spacing}px` }), {});

export const THEME = {
  auth: {
    bg: GENERAL_COLORS.blue,
    formBg: GENERAL_COLORS.white
  },
  general: {
    color: GENERAL_COLORS,
    spacing: SPACING,
    font: {
      family: 'Helvetica',
      fallbackFamily: 'Arial'
    }
  }
};

export const frameworkTheme = createTheme({
  palette: {
    primary: {
      main: GENERAL_COLORS.blue,
      dark: GENERAL_COLORS.darkBlue,
      light: GENERAL_COLORS.lightBlue
    },
    secondary: {
      main: GENERAL_COLORS.pink,
      dark: GENERAL_COLORS.darkPink,
      light: GENERAL_COLORS.lightPink
    },
    error: {
      main: GENERAL_COLORS.red,
      dark: GENERAL_COLORS.darkRed,
      light: GENERAL_COLORS.lightRed
    },
    warning: {
      main: GENERAL_COLORS.orange,
      dark: GENERAL_COLORS.darkOrange,
      light: GENERAL_COLORS.lightOrange
    },
    info: {
      main: GENERAL_COLORS.cyan,
      dark: GENERAL_COLORS.darkCyan,
      light: GENERAL_COLORS.lightCyan
    },
    success: {
      main: GENERAL_COLORS.green,
      dark: GENERAL_COLORS.darkGreen,
      light: GENERAL_COLORS.lightGreen
    }
  },
  typography: {
    fontFamily: [THEME.general.font.family, THEME.general.font.fallbackFamily].join(', '),
    h1: {
      color: GENERAL_COLORS.black
    },
    h2: {
      color: GENERAL_COLORS.black
    },
    h3: {
      color: GENERAL_COLORS.black
    },
    h4: {
      color: GENERAL_COLORS.black
    },
    body1: {
      color: GENERAL_COLORS.gray
    }
  }
});

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;
