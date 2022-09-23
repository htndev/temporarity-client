import { Link, LinkProps } from '@mui/material';
import { useEffect } from 'react';
import { FC, useState } from 'react';
import { To } from 'react-router-dom';

const buildUrl = (to: To): string => {
  if (typeof to === 'string') {
    return to;
  }
  const basePath = to.pathname || '';
  const hash = to.hash || '';
  const query = to.search || '';

  return `${basePath}${hash}${query}`;
};

export const ExternalLink: FC<Omit<LinkProps, 'underline' | 'component' | 'href'> & { to: To }> = ({
  to,
  ...props
}) => {
  const [url, setUrl] = useState(buildUrl(to));
  useEffect(() => setUrl(buildUrl(to)), [to]);

  return <Link underline="none" href={url} {...props} />;
};
