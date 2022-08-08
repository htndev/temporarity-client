import { FC } from 'react';
import { ReactComponent as LogoComponent } from '../../assets/images/logo.svg';

const SIZE = {
  small: '50px',
  regular: '100px',
  large: '150px'
};

type SizeType = keyof typeof SIZE;

const getSize = (props: { [k in SizeType]?: boolean }): {
  width: string;
  height: string;
} => {
  const value =
    (Object.keys(props).find((propKey: string) => (props as any)[propKey] === true) as SizeType) ||
    'regular';

  return {
    width: SIZE[value],
    height: SIZE[value]
  };
};

export const Logo: FC<{ [k in SizeType]?: boolean }> = (props) => (
  <LogoComponent {...getSize(props)} />
);
