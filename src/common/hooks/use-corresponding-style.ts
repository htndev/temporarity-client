import { useTheme } from '@mui/material/styles';
import { Variant } from '@mui/material/styles/createTypography';

export const useCorrespondingStyle = (tag: Variant) => {
  const theme = useTheme();
  const styles = theme.typography[tag];

  return styles;
};
