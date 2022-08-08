import { Typography, TypographyTypeMap } from '@mui/material';
import { FC } from 'react';
import { useCorrespondingStyle } from '../../../common/utils/hooks/useCorrespondingStyle';
import { useStyleVariables } from '../../../common/utils/hooks/useStyleVariables';

type Props = { isCentered?: boolean; sx?: TypographyTypeMap['props']['sx'] };

export const Text: FC<Props> = ({ children, sx = {}, isCentered = false }) => {
  const variant = 'body1';
  const style = useCorrespondingStyle(variant);
  const { spacing } = useStyleVariables();

  return (
    <Typography
      variant={variant}
      component="p"
      color={style.color}
      sx={{ marginBottom: spacing.spacing2, textAlign: isCentered ? 'center' : 'left', ...sx }}
    >
      {children}
    </Typography>
  );
};
