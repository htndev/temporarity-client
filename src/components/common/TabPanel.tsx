import { Box } from '@mui/material';
import { FC } from 'react';

type TabValueType = string | number;

interface Props {
  index: TabValueType;
  value: TabValueType;
}

export const TabPanel: FC<Props> = ({ children, index, value }) =>
  index === value ? <Box>{children}</Box> : null;
