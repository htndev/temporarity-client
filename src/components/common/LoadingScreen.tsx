import { CircularProgress } from '@mui/material';
import { LoadingScreenWrapper } from './LoadingScreen.styled';

export const LoadingScreen = () => (
  <LoadingScreenWrapper>
    <CircularProgress size={50} />
  </LoadingScreenWrapper>
);
