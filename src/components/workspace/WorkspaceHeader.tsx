import { IconButton, TextField, Tooltip } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { currentWorkspaceSelector } from '../../store/selectors/current-workspace';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import { useToast } from '../common/toastMessage';
import InfoIcon from '@mui/icons-material/Info';

interface WorkspaceHeaderProps {}

export const WorkspaceHeader: FC<WorkspaceHeaderProps> = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const currentWorkspace = useAppSelector(currentWorkspaceSelector);

  const onCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(currentWorkspace?.apiKey || '');
      toast(t('common.clipboard.success'), { type: 'success', duration: 'medium' });
    } catch (e) {
      toast(t('common.clipboard.error'), { type: 'error', duration: 'medium' });
    }
  };

  return (
    <header>
      <h1>{currentWorkspace?.name}</h1>
      <p>{currentWorkspace?.description}</p>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginBottom: 1 }}>
        <TextField
          label={t('workspace.api-key')}
          type="password"
          sx={{ marginRight: 1 }}
          value={currentWorkspace?.apiKey ?? ''}
          size="small"
        />
        <Tooltip title={t('workspace.copy-api-key')}>
          <IconButton onClick={onCopyApiKey} size="small">
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('workspace.api-key-info')}>
          <InfoIcon />
        </Tooltip>
      </Box>
    </header>
  );
};
