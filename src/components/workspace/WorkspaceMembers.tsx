import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../common/Button';
import { Text } from '../common/typography/Text';
import { WorkspaceMemberList } from '../workspace-members/WorkspaceMemberList';
import { InviteUserToWorkspaceModal } from './InviteUserToWorkspaceModal';

export const WorkspaceMembers: FC = () => {
  const { t } = useTranslation();
  const currentWorkspaceMembers = useAppSelector(
    (state) => state.currentWorkspace.currentWorkspace?.membership
  );
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <div>
      <InviteUserToWorkspaceModal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text as="h4" sx={{ marginTop: 1, marginBottom: 1 }}>
          {t('workspace.membership.members')}
        </Text>
        <Button variant="contained" onClick={() => setIsModalOpened(true)}>
          {t('workspace.membership.invite-member')}
        </Button>
      </Box>
      <WorkspaceMemberList memberships={currentWorkspaceMembers} />
    </div>
  );
};
