import { Autocomplete, Box, TextField } from '@mui/material';
import { FC } from 'react';
import { RESPONSE_STATUS } from '../../common/constants/routes.constant';
import { Text } from './typography/Text';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MAPPED_HTTP_STATUS = Object.keys(RESPONSE_STATUS);

export const StatusInput: FC<Props> = ({ value, onChange }) => (
  <Autocomplete
    freeSolo
    value={value}
    options={MAPPED_HTTP_STATUS as []}
    renderInput={(params) => <TextField {...params} />}
    renderOption={(props: any, option: keyof typeof RESPONSE_STATUS) => (
      <Box component="li" sx={{ mt: 2, '&:not(:last-child)': { mb: 2 } }} {...props}>
        <Text as="caption">
          {option} ({RESPONSE_STATUS[option]})
        </Text>
      </Box>
    )}
    onChange={(_, value) => onChange(value as string)} />
);
