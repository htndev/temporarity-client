import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../../common/AppLink';
import { Text } from '../../common/typography/Text';

interface Props {
  onChange: (value: string) => void;
}

const DEFAULT_SCHEMA = JSON.stringify(
  { status: 200, message: 'API route reached successfully' },
  null,
  4
);

export const CreateSchemaRouteResponse: FC<Props> = ({ onChange }) => {
  const { t } = useTranslation();
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);

  useEffect(() => onChange(schema), [schema]);

  return (
    <Box sx={{ mt: 1 }}>
      <Text as="subtitle1">{t('workspace.routes.create-route-modal.type.schema.description')}</Text>
      <Text sx={{ mb: 2 }}>
        <AppLink to="/faq" target="_blank">
          {t('workspace.routes.create-route-modal.type.schema.hint')}
        </AppLink>
      </Text>
      <Editor
        value={schema}
        defaultValue={DEFAULT_SCHEMA}
        onChange={(value) => setSchema(value ?? '')}
        language="json"
        height="250px"
      />
    </Box>
  );
};
