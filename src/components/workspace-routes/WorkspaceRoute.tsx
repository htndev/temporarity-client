import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { FC, useMemo } from 'react';
import { HttpMethod, Route } from '../../common/types/routes.type';
import { WorkspaceRoutePath } from './WorkspaceRoutePath';

interface Props {
  route: Route;
}

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 4px;
  transition: transform 0.15s ease-in-out;
  cursor: pointer;
  will-change: transform, box-shadow;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }

  &:hover {
    transform: scale(1.005);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const PaperBox = styled(Paper)``;

const MethodPlate = styled(PaperBox, { shouldForwardProp: (prop) => prop !== 'method' })<{
  method: HttpMethod;
}>`
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  color: ${({ theme }) => theme.palette.common.white};
  border-radius: 4px;
  background-color: ${({ method, theme }) => {
    switch (method) {
      case HttpMethod.GET:
      case HttpMethod.HEAD:
        return theme.palette.success.main;
      case HttpMethod.POST:
        return theme.palette.primary.main;
      case HttpMethod.PUT:
        return theme.palette.warning.main;
      case HttpMethod.DELETE:
        return theme.palette.error.main;
      case HttpMethod.PATCH:
        return theme.palette.info.main;
      case HttpMethod.OPTIONS:
        return theme.palette.grey[500];
      default:
        return theme.palette.grey[300];
    }
  }};
`;

const MethodsWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const WorkspaceRoute: FC<Props> = ({ route }) => {
  const methods = useMemo(() => [...route.methods].sort(), [route.methods]);

  return (
    <Wrapper>
      <WorkspaceRoutePath path={route.path} />
      <MethodsWrapper>
        {methods.map((method) => (
          <MethodPlate key={method} method={method}>
            {method}
          </MethodPlate>
        ))}
      </MethodsWrapper>
    </Wrapper>
  );
};
