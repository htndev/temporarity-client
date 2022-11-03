import { Box, Modal } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalBody } from '../common/ModalBody';
import { Text } from '../common/typography/Text';
import { MuiChipsInput } from 'mui-chips-input';
import isEmail from 'validator/lib/isEmail';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../common/Button';
import { useDispatch } from 'react-redux';
import { INVITE_USERS_TO_WORKSPACE } from '../../store/actions/current-workspace';
import { currentWorkspaceSelector } from '../../store/selectors/current-workspace';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteUserToWorkspaceModal: FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [emails, setEmails] = useState<string[]>([]);
  const currentMembers = useAppSelector(
    (state) => state.currentWorkspace.currentWorkspace?.membership
  );
  const currentWorkspace = useAppSelector(currentWorkspaceSelector);
  const shouldSubmitBeEnabled = useMemo(() => !!emails.length, [emails]);

  const isEmailInCurrentWorkspace = (email: string) =>
    !currentMembers ? false : currentMembers.some((member) => member.email === email);

  const close = () => {
    setEmails([]);
    onClose();
  };

  const inviteUsersToWorkspace = () => {
    dispatch(INVITE_USERS_TO_WORKSPACE({ emails, slug: String(currentWorkspace?.slug) }));
    close();
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <ModalBody width="400px">
        <Text as="h4">{t('workspace.membership.invite-modal.title')}</Text>
        <Text as="subtitle2">{t('workspace.membership.invite-modal.description')}</Text>
        <MuiChipsInput
          label={t('workspace.membership.invite-modal.hint')}
          value={emails}
          onChange={setEmails}
          validate={(email) => isEmail(email) && !isEmailInCurrentWorkspace(email)}
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button sx={{ marginRight: 1 }} onClick={onClose} variant="text">
            {t('common.cancel')}
          </Button>
          <Button
            disabled={!shouldSubmitBeEnabled}
            onClick={inviteUsersToWorkspace}
            variant="contained"
          >
            {t('workspace.membership.invite-modal.submit')}
          </Button>
        </Box>
      </ModalBody>
    </Modal>
  );
};
