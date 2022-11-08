import { Box } from '@mui/material';
import { FC } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../common/toastMessage';
import { Text } from '../../common/typography/Text';

interface Props {
  onChange: (file: File) => void;
}

export const CreateFileRouteResponse: FC<Props> = ({ onChange }) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleFileUpload = (file: File) => onChange(file);

  return (
    <Box>
      <Text as="subtitle1" sx={{ mt: 1 }}>
        {t('workspace.routes.create-route-modal.type.file.description')}
      </Text>
      <FileUploader
        name="file"
        label={t('common.dnd.label')}
        maxSize={5}
        onSizeError={() => toast(t('common.dnd.limit'))}
        handleChange={handleFileUpload}
      />
    </Box>
  );
};
