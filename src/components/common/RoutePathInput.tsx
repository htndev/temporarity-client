import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmptyValidator } from '../../common/utils/validators';
import { Input } from './Input';
import { Text } from './typography/Text';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const RoutePathInput: FC<Props> = ({ value, onChange, onBlur }) => {
  const { t } = useTranslation();
  const emptyValidator = useMemo(
    () => isEmptyValidator(t('workspace.routes.create-route-modal.error.path.empty')),
    []
  );

  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rules={[emptyValidator]}
        placeholder={t('workspace.routes.create-route-modal.field.path')}
        fullWidth
      />
      <Text as="subtitle2">{t('workspace.routes.hints.dynamic-param')}</Text>
      <Text as="subtitle2">{t('workspace.routes.hints.wildcard-param')}</Text>
      <Text as="subtitle2">{t('workspace.routes.hints.double-wildcard-param')}</Text>
    </>
  );
};
