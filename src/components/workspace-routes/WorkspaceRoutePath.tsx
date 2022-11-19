import { styled } from '@mui/material';
import { FC, useMemo } from 'react';
import { Text } from '../common/typography/Text';

interface Props {
  path: string;
}

type PathPartStructure = {
  type: PathPart;
  value: string;
};

enum PathPart {
  Param = 'param',
  Word = 'word',
  Wildcard = 'wildcard'
}

const getPathPart = (path: string): PathPartStructure => {
  switch (true) {
    case path.startsWith(':'):
      return {
        type: PathPart.Param,
        value: path
      };
    case path.includes('*'):
      return {
        type: PathPart.Wildcard,
        value: path
      };
    default:
      return {
        type: PathPart.Word,
        value: path
      };
  }
};

const PathPartItem = styled('span', { shouldForwardProp: (prop) => prop !== 'type' })<{
  type: PathPart;
}>`
  color: ${({ type, theme }) => {
    switch (type) {
      case PathPart.Param:
        return theme.palette.warning.main;
      case PathPart.Wildcard:
        return theme.palette.success.dark;
      default:
        return 'inherit';
    }
  }};
`;

const Path: FC<PathPartStructure> = ({ type, value }) => (
  <>
    /<PathPartItem type={type}>{value}</PathPartItem>
  </>
);

export const WorkspaceRoutePath: FC<Props> = ({ path }) => {
  const partsOfPath = useMemo(() => path.split('/').map(getPathPart), [path]);

  return (
    <Text as="h6" isFluid>
      {partsOfPath.map((props, index) => (
        <Path {...props} key={index} />
      ))}
    </Text>
  );
};
