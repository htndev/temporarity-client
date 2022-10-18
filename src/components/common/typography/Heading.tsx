import { Typography } from '@mui/material';
import { FC } from 'react';
import { useCorrespondingStyle } from '../../../common/hooks/use-corresponding-style';
import { useStyleVariables } from '../../../common/hooks/use-style-variables';

type Headings = 1 | 2 | 3 | 4;

type Props = { level: Headings; isCentered?: boolean };

export const Heading: FC<Props> = ({ level = 1, isCentered = false, children }) => {
  const tag: `h${Headings}` = `h${level}`;
  const style = useCorrespondingStyle(tag);
  const { spacing } = useStyleVariables();

  return (
    <Typography
      variant={tag}
      component={tag}
      color={style.color}
      sx={{
        textAlign: isCentered ? 'center' : 'left',
        marginBottom: spacing.spacing4
      }}
    >
      {children}
    </Typography>
  );
};
