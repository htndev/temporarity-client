import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { Layout } from '../components/common/Layout';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';
import { withHasAccessToWorkspace } from '../components/hoc/HasAccessToWorkspace';

const Workspace: FC = () => {
  const { slug } = useParams();
  return <Layout>Workspace {slug}</Layout>;
};

export default connectComponentHoc(Workspace)(
  withAuthGuardApp,
  withHasAccessToWorkspace,
  withFetchWorkspaces,
);
