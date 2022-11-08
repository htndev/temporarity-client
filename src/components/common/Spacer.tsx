import { Box } from '@mui/material';
import {
  AliasesCSSProperties,
  CSSSelectorObjectOrCssVariables,
  StandardCSSProperties
} from '@mui/system';
import { FC } from 'react';

interface Props {
  space:
    | (Pick<AliasesCSSProperties, 'm' | 'mb' | 'ml' | 'mr' | 'mt' | 'mx' | 'my'> &
        Pick<StandardCSSProperties, 'margin'>)
    | Pick<
        CSSSelectorObjectOrCssVariables,
        'marginBottom' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginX' | 'marginY'
      >;
}

export const Spacer: FC<Props> = ({ space }) => {
  return <Box sx={space as any} />;
};
