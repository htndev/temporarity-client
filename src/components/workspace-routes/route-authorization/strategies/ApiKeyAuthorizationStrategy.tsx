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
          originalLabel={t('API Key')}
          onChange={(value) => setPayload((prev) => ({ ...prev, apiKey: value }))}
          rules={[isEmptyValidator(t('API Key field should not be empty'))]}
        />
      </Box>
      <Box>
        <Input
          value={payload.apiKeyQueryParam}
          originalLabel={t('API Key Query Param')}
          onChange={(value) => setPayload((prev) => ({ ...prev, apiKeyQueryParam: value }))}
          rules={[isEmptyValidator(t('API Key Query Parameter field should not be empty'))]}
        />
      </Box>
    </Box>
  );
};
