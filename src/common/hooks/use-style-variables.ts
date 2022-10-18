import { useTheme as useStyledTheme } from 'styled-components';
import { ThemeColors, ThemeFont, ThemeSpacings } from '../types/theme.type';

export const useStyleVariables = () => {
  const {
    general: { spacing, color, font }
  } = useStyledTheme() as {
    general: { color: ThemeColors; spacing: ThemeSpacings; font: ThemeFont };
  };

  return { spacing, color, font };
};
