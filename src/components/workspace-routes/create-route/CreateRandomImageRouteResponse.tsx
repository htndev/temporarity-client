import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../common/typography/Text';

export const CreateRandomImageRouteResponse: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Text as="subtitle2">
        {t('workspace.routes.create-route-modal.type.random-image.description')}
      </Text>
    </div>
  );
};
