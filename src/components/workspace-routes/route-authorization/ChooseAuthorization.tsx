import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteAuthorizationStrategy } from '../../../common/types/routes.type';

const strategies = Object.values(RouteAuthorizationStrategy);

interface Props {
  value: string;
  onChange: (strategy: RouteAuthorizationStrategy) => void;
}

export const ChooseAuthorization: FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <FormControl>
      <InputLabel id="select-auth-strategy">{t('authorization.select')}</InputLabel>
      <Select
        labelId="select-auth-strategy"
        label={t('authorization.select')}
        onChange={(e) => onChange(e.target.value as RouteAuthorizationStrategy)}
        value={value}
      >
        {strategies.map((strategy) => (
          <MenuItem key={strategy} value={strategy}>
            {t(`authorization.strategy.${strategy}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
