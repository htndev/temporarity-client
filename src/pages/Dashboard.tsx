import { FC } from 'react';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { Layout } from '../components/common/Layout';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';

const Dashboard: FC = () => {
  return <Layout>Dashboard</Layout>;
};

export default connectComponentHoc(Dashboard)(withAuthGuardApp, withFetchWorkspaces);
