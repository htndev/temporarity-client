import { Link, LinkProps } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink, To } from 'react-router-dom';

export const AppLink: FC<Omit<LinkProps, 'component' | 'underline' | 'href'> & { to: To }> = ({
  sx,
  ...props
}) => <Link component={RouterLink} underline="none" {...props} />;
