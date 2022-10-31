import { Tab, Tabs } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { Layout } from '../components/common/Layout';
import { TabPanel } from '../components/common/TabPanel';
import { useToast } from '../components/common/toastMessage';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';
import { withHasAccessToWorkspace } from '../components/hoc/HasAccessToWorkspace';
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader';
import { WorkspaceMembers } from '../components/workspace/WorkspaceMembers';
import { WorkspaceRoutes } from '../components/workspace/WorkspaceRoutes';
import { FETCH_CURRENT_WORKSPACE } from '../store/actions/current-workspace';
import { useAppSelector } from '../store/hooks';

enum TabValue {
  Routes,
  Members
}

export const TAB_QUERY_PARAM = 'tab';

const Workspace: FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const currentWorkspaceError = useAppSelector((state) => state.currentWorkspace.error);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(TabValue.Routes);

  const setTabValue = (tab: TabValue) => {
    searchParams.set(TAB_QUERY_PARAM, String(tab));
    setSearchParams(searchParams);
    setCurrentTab(tab);
  };

  useEffect(() => {
    const queryTab = searchParams.get(TAB_QUERY_PARAM);
    if (!queryTab) {
      setTabValue(TabValue.Routes);
    }
    setCurrentTab(Number(queryTab));
  }, []);

  useEffect(() => {
    if (!slug) {
      return;
    }

    dispatch(FETCH_CURRENT_WORKSPACE({ slug }));
  }, [slug]);

  useEffect(() => {
    if (currentWorkspaceError) {
      toast(currentWorkspaceError, { type: 'error', duration: 'medium' });
    }
  }, [currentWorkspaceError]);

  // TODO: Split into tabs: members and routes
  return (
    <Layout>
      <WorkspaceHeader />
      <Tabs value={currentTab} onChange={(_, value) => setTabValue(value)}>
        <Tab label={t('workspace.tab.routes')} value={TabValue.Routes} />
        <Tab label={t('workspace.tab.members')} value={TabValue.Members} />
      </Tabs>
      <TabPanel value={currentTab} index={TabValue.Routes}>
        <WorkspaceRoutes />
      </TabPanel>
      <TabPanel value={currentTab} index={TabValue.Members}>
        <WorkspaceMembers />
      </TabPanel>
    </Layout>
  );
};

export default connectComponentHoc(Workspace)(
  withAuthGuardApp,
  withHasAccessToWorkspace,
  withFetchWorkspaces
);
