import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../common/typography/Text';

export const NoneAuthorizationStrategy: FC = () => {
  const { t } = useTranslation();

  return <Text>{t('workspace.routes.authorization.strategy.none.description')}</Text>;
};
