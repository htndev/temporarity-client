import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalBody = styled(Box, { shouldForwardProp: (prop) => prop !== 'width' })<{
  width: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  padding: ${({ theme }) => theme.spacing(4)};
`;
