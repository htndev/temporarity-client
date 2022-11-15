import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { HTTP_METHODS } from '../../common/constants/routes.constant';
import { HttpMethod } from '../../common/types/routes.type';

interface Props {
  value: HttpMethod[];
  onChange: (value: HttpMethod[]) => void;
}

export const SelectMethods: FC<Props> = ({ value, onChange }) => (
  <ToggleButtonGroup
    value={value}
    onChange={(_: any, newMethods: HttpMethod[]) => onChange(newMethods)}
    fullWidth
  >
    {HTTP_METHODS.map((status) => (
      <ToggleButton value={status} key={status}>
        {status}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);
