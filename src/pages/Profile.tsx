import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { Layout } from '../components/common/Layout';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';

const Profile: FC = () => {
  return (
    <Layout>
      <h1>Profile</h1>
      <h2>Personal information</h2>
      <Box>
        <TextField placeholder="Full name" />
      </Box>
      <Box>
        <TextField placeholder="Email" />
      </Box>
      <Box>Language</Box>
    </Layout>
  );
};

export default connectComponentHoc(Profile)(withAuthGuardApp, withFetchWorkspaces);
