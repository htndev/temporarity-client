import { Box, Paper } from '@mui/material';
import { FC, HTMLAttributes, ReactChild } from 'react';
import styled from 'styled-components';
import { useStyleVariables } from '../../../common/utils/hooks/useStyleVariables';
import { Logo } from '../Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export const AuthPageWrapper = ({ children }: { children: ReactChild }) => {
  const { color } = useStyleVariables();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: color.cyan,
        backgroundImage: `linear-gradient(to bottom right, ${color.white} 50%, ${color.cyan} 50%)`
      }}
    >
      <LanguageSwitcher />
      {children}
    </Box>
  );
};

const Form = styled.form`
  background: ${(props) => props.theme.auth.formBg};
  padding: ${(props) => props.theme.general.spacing.spacing5}
    ${(props) => props.theme.general.spacing.spacing4};
  width: 400px;
  height: auto;
  border-radius: 4px;
`;

export const AuthForm: FC<HTMLAttributes<HTMLFormElement>> = (props) => (
  <>
    <Logo regular />
    <Paper elevation={1}>
      <Form {...props} />
    </Paper>
  </>
);
