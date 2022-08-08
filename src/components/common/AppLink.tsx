import { Link } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export const AppLink: FC<Omit<LinkProps, 'component'>> = (props) => (
  <Link component={RouterLink} {...props} />
);
