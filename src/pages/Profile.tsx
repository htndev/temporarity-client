import { FC } from 'react';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';

const Profile: FC = () => {
  return <div>Profile</div>;
};

export default connectComponentHoc(Profile)(withAuthGuardApp, withFetchWorkspaces);
