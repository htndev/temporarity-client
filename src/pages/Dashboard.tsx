import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../common/hooks/use-document-title';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { Layout } from '../components/common/Layout';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useDocumentTitle(t('page-title.dashboard'));

  useEffect(() => {
    navigate('/workspaces');
  }, []);

  return <Layout>Dashboard</Layout>;
};

export default connectComponentHoc(Dashboard)(withAuthGuardApp, withFetchWorkspaces);
