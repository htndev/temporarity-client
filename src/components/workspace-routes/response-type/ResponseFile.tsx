import { Box, CircularProgress } from '@mui/material';
import { filesize } from 'filesize';
import { FC, useEffect, useMemo, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from '../../common/ExternalLink';
import { useToast } from '../../common/toastMessage';
import { Text } from '../../common/typography/Text';

interface Props {
  url: string;
  onChange: (file: File | null) => void;
}

const isUrl = (url: string): boolean => !!url && url.startsWith('http');

export const ResponseFile: FC<Props> = ({ url, onChange }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const isUrlValid = useMemo(() => isUrl(url), [url]);

  useEffect(() => {
    if (isUrl(url)) {
      setIsLoading(true);
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => setFileSize(blob.size))
        .finally(() => setIsLoading(false));
    }
  }, [url]);

  useEffect(() => {
    onChange(null);
  }, []);

  const handleFileUpload = (file: File) => onChange(file);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Text as="h6">{t('workspace.routes.create-route-modal.type.file.title')}</Text>
      </Box>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            {isUrlValid && (
              <>
                <Text>
                  {t('workspace.routes.update-route.file-response.file-size', {
                    size: filesize(fileSize, { base: 2, standard: 'jedec' })
                  })}
                </Text>
                <Text sx={{ mb: 2, mt: 2 }}>
                  <ExternalLink to={url}>
                    {t('workspace.routes.update-route.file-response.open')}
                  </ExternalLink>
                </Text>
              </>
            )}
            <FileUploader
              name="file"
              label={t('common.dnd.label')}
              maxSize={5}
              onSizeError={() => toast(t('common.dnd.limit'))}
              handleChange={handleFileUpload}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
