import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../../common/AppLink';
import { Text } from '../../common/typography/Text';

interface Props {
  schema: object | string;
  status: number;
  onChange: (value: string) => void;
}

const getSchemaTemplate = (status: number) => ({
  status,
  message: 'API call succeeded',
  data: {}
});

const isS3File = (schema: string) =>
  typeof schema === 'string' && schema.startsWith('https://temporarity');

export const ResponseSchema: FC<Props> = ({ schema, status, onChange }) => {
  const { t } = useTranslation();
  const [body, setBody] = useState(
    JSON.stringify(
      schema && !isS3File(schema as string) ? JSON.parse(schema as string) : getSchemaTemplate(status),
      null,
      2
    )
  );

  useEffect(() => onChange(body), [body]);

  return (
    <Box>
      <Box>
        <Text as="h6">{t('workspace.routes.create-route-modal.type.schema.title')}</Text>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Text>
          <AppLink to="/faq" target="_blank">
            {t('workspace.routes.create-route-modal.type.schema.hint')}
          </AppLink>
        </Text>
      </Box>
      <Box>
        <Editor
          value={body}
          onChange={(value) => setBody(value ?? '')}
          height="450px"
          language="json"
        />
      </Box>
    </Box>
  );
};
