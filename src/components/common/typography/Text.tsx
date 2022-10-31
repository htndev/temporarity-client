import { Typography, TypographyTypeMap } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { FC } from 'react';
import { useCorrespondingStyle } from '../../../common/hooks/use-corresponding-style';
import { useStyleVariables } from '../../../common/hooks/use-style-variables';

type Props = {
  isCentered?: boolean;
  isFluid?: boolean;
  sx?: TypographyTypeMap['props']['sx'];
  as?: Variant;
};

export const Text: FC<Props> = ({
  children,
  sx = {},
  isCentered = false,
  isFluid = false,
  as = 'body1'
}) => {
  const style = useCorrespondingStyle(as);
  const { spacing } = useStyleVariables();

  return (
    <Typography
      variant={as}
      component="p"
      color={style.color}
      sx={{
        marginBottom: isFluid ? 0 : spacing.spacing2,
        textAlign: isCentered ? 'center' : 'left',
        ...sx
      }}
    >
      {children}
    </Typography>
  );
};
