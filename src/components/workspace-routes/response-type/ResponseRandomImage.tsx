import { Box } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../common/typography/Text';

export const ResponseRandomImage: FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Text as="h4">{t('workspace.routes.create-route-modal.type.random-image.title')}</Text>
        <Text as="body1">
          {t('workspace.routes.create-route-modal.type.random-image.description')}
        </Text>
      </Box>
    </Box>
  );
};
