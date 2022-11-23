import { Grid, Tab, Tabs, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../common/hooks/use-document-title';
import { Workspace } from '../common/types/workspace.type';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { isEmptyValidator } from '../common/utils/validators';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Layout } from '../components/common/Layout';
import { useToast } from '../components/common/toastMessage';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';
import { CreateWorkspacePopup } from '../components/workspaces/CreateWorkspacePopup';
import { WorkspacePlate } from '../components/workspaces/WorkspacePlate';
import { CREATE_WORKSPACE } from '../store/actions/workspaces';
import { useAppSelector } from '../store/hooks';
import {
  myWorkspacesSelector,
  sharedWorkspacesSelector,
  workspacesSelector
} from '../store/selectors/workspaces';

const ALLOWED_SYMBOLS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

enum WorkspaceTab {
  All,
  My,
  Shared
}

const Workspaces: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();
  const allWorkspaces = useAppSelector(workspacesSelector);
  const myWorkspaces = useAppSelector(myWorkspacesSelector);
  const sharedWorkspaces = useAppSelector(sharedWorkspacesSelector);
  const isCreatingWorkspace = useAppSelector((state) => state.workspaces.isCreatingWorkspace);
  const creatingWorkspaceError = useAppSelector((state) => state.workspaces.error);
  const [tab, setTab] = useState(WorkspaceTab.All);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [isCreateWorkspacePopupOpened, setIsCreateWorkspacePopupOpened] = useState(false);

  const activeWorkspaces = useMemo(
    () => ({
      [WorkspaceTab.All]: allWorkspaces,
      [WorkspaceTab.My]: myWorkspaces,
      [WorkspaceTab.Shared]: sharedWorkspaces
    }),
    [allWorkspaces, myWorkspaces, sharedWorkspaces]
  );
  const selectedWorkspacesByTab = useMemo(() => activeWorkspaces[tab], [activeWorkspaces, tab]);

  const isUniqueSlugValidator = (slug: string) =>
    selectedWorkspacesByTab.find((w) => w.slug === slug) !== undefined
      ? t('workspaces.createModal.rules.slug.unique')
      : true;

  const handleSlug = (slug: string) => {
    const newSlug = slug
      .toLowerCase()
      .split('')
      .filter((s) => ALLOWED_SYMBOLS.includes(s))
      .join('');

    setNewSlug(newSlug);
  };

  const createNewWorkspace = (): void => {
    const requestData = {
      name: newWorkspaceName,
      slug: newSlug,
      description: newWorkspaceDescription
    };

    dispatch(CREATE_WORKSPACE({ requestData, navigate }));
  };

  useDocumentTitle(t('page-title.workspaces'));

  useEffect(() => {
    if (!creatingWorkspaceError) {
      return;
    }

    toast(creatingWorkspaceError, { type: 'error', duration: 'medium' });
  }, [creatingWorkspaceError]);

  return (
    <Layout>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Tabs value={tab} onChange={(_, value) => setTab(value)}>
            <Tab label={t('workspaces.tabs.all')} value={WorkspaceTab.All} />
            <Tab label={t('workspaces.tabs.my')} value={WorkspaceTab.My} />
            <Tab label={t('workspaces.tabs.shared')} value={WorkspaceTab.Shared} />
          </Tabs>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setIsCreateWorkspacePopupOpened(true)}>
            {t('common.create')}
          </Button>
          <CreateWorkspacePopup
            isOpen={isCreateWorkspacePopupOpened}
            onChange={setIsCreateWorkspacePopupOpened}
          >
            <Typography variant="h6" paddingBottom={2}>
              {t('workspaces.createModal.title')}
            </Typography>
            <Input
              value={newWorkspaceName}
              onChange={setNewWorkspaceName}
              placeholder={t('workspaces.createModal.name')}
              rules={[isEmptyValidator(t('workspaces.createModal.rules.name.empty'))]}
              fullWidth
            />
            <Input
              value={newSlug}
              onChange={handleSlug}
              placeholder={t('workspaces.createModal.slug')}
              rules={[
                isUniqueSlugValidator,
                isEmptyValidator(t('workspaces.createModal.rules.slug.empty'))
              ]}
              fullWidth
            />
            <Input
              value={newWorkspaceDescription}
              onChange={setNewWorkspaceDescription}
              helperText={t('common.optional')}
              placeholder={t('workspaces.createModal.description')}
              fullWidth
            />
            <Button variant="contained" loading={isCreatingWorkspace} onClick={createNewWorkspace}>
              {t('workspaces.createModal.create')}
            </Button>
          </CreateWorkspacePopup>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        {selectedWorkspacesByTab.length
          ? selectedWorkspacesByTab.map((workspace: Workspace) => (
              <WorkspacePlate
                key={workspace.slug}
                slug={workspace.slug}
                title={workspace.name}
                description={workspace.description}
              />
            ))
          : t('workspaces.dashboard.noWorkspaces')}
      </Grid>
    </Layout>
  );
};

export default connectComponentHoc(Workspaces)(withAuthGuardApp, withFetchWorkspaces);
