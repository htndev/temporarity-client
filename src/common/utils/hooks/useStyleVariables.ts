import { spacing } from '@mui/system';
import { ThemeColors, ThemeSpacings, ThemeFont } from './../../types/theme.type';
import { useTheme as useStyledTheme } from 'styled-components';

export const useStyleVariables = () => {
  const {
    general: { spacing, color, font }
  } = useStyledTheme() as {
    general: { color: ThemeColors; spacing: ThemeSpacings; font: ThemeFont };
  };

  return { spacing, color, font };
};
