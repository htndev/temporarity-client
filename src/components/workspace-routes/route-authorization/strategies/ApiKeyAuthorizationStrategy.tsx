import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiKeyConfig } from '../../../../common/types/routes.type';
import { isEmptyValidator } from '../../../../common/utils/validators';
import { Input } from '../../../common/Input';

interface Props {
  payload: ApiKeyConfig | null;
  onChange: (payload: object) => void;
}

const DEFAULT_PAYLOAD: ApiKeyConfig = {
  apiKey: 'api-key',
  apiKeyQueryParam: 'apiKey'
};

export const ApiKeyAuthorizationStrategy: FC<Props> = ({ payload: initialPayload, onChange }) => {
  const { t } = useTranslation();
  const [payload, setPayload] = useState(initialPayload || DEFAULT_PAYLOAD);

  useEffect(() => {
    if (initialPayload) {
      return;
    }

    onChange(DEFAULT_PAYLOAD);
  }, []);

  useEffect(() => setPayload(initialPayload || DEFAULT_PAYLOAD), [initialPayload]);

  useEffect(() => onChange(payload), [payload]);

  return (
    <Box>
      <Box>
        <Input
          value={payload.apiKey}
          originalLabel={t('workspace.routes.authorization.strategy.api-key.label.api-key')}
          onChange={(value) => setPayload((prev) => ({ ...prev, apiKey: value }))}
          rules={[isEmptyValidator(t('workspace.routes.authorization.strategy.api-key.rule.empty.api-key'))]}
        />
      </Box>
      <Box>
        <Input
          value={payload.apiKeyQueryParam}
          originalLabel={t('workspace.routes.authorization.strategy.api-key.label.api-key-query-param')}
          onChange={(value) => setPayload((prev) => ({ ...prev, apiKeyQueryParam: value }))}
          rules={[isEmptyValidator(t('workspace.routes.authorization.strategy.api-key.rule.empty.api-key-query-param'))]}
        />
      </Box>
    </Box>
  );
};
