import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BeValidConfig,
  Condition,
  EqualsConfig,
  JwtStrategyConfig
} from '../../../../common/types/routes.type';
import { Input } from '../../../common/Input';
import { Text } from '../../../common/typography/Text';

interface Props {
  payload: JwtStrategyConfig | null;
  originalPayload: JwtStrategyConfig | null;
  onChange: (payload: object | null) => void;
}

interface ConditionProps<T = null> {
  payload: T;
  onChange: (value: any) => void;
}

const BePresentedComponent: FC<ConditionProps> = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text>
        {t('workspace.routes.authorization.strategy.jwt.condition.be-presented.description')}
      </Text>
    </Box>
  );
};

const NotExpiredComponent: FC<ConditionProps> = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box>
        {t('workspace.routes.authorization.strategy.jwt.condition.not-expired.description')}
      </Box>
    </Box>
  );
};

type BeValidPayload = BeValidConfig['payload'];

const BeValidComponent: FC<ConditionProps<BeValidPayload>> = ({ payload, onChange }) => {
  const { t } = useTranslation();
  const [signature, setSignature] = useState(payload?.signature || '');

  useEffect(() => onChange({ condition: Condition.BeValid, payload: { signature } }), [signature]);

  return (
    <Box>
      <Input
        originalLabel={t(
          'workspace.routes.authorization.strategy.jwt.condition.be-valid.field.signature'
        )}
        value={signature}
        onChange={setSignature}
      />
    </Box>
  );
};

type EqualsPayload = EqualsConfig['payload'];

const EqualsComponent: FC<ConditionProps<EqualsPayload>> = ({ payload, onChange }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(payload?.value || 'token');

  useEffect(() => onChange({ condition: Condition.Equals, payload: { value } }), [value]);

  return (
    <Box>
      <Input
        originalLabel={t(
          'workspace.routes.authorization.strategy.jwt.condition.equals.field.token'
        )}
        value={value}
        onChange={setValue}
      />
    </Box>
  );
};

const CONDITION_COMPONENTS: { [k in Condition]: FC<ConditionProps<any>> } = {
  [Condition.BePresented]: BePresentedComponent,
  [Condition.NotExpired]: NotExpiredComponent,
  [Condition.BeValid]: BeValidComponent,
  [Condition.Equals]: EqualsComponent
};

const CONDITIONS = Object.values(Condition);

const CONDITION_DEFAULT_PAYLOAD = {
  [Condition.BePresented]: {
    condition: Condition.BePresented,
    payload: null
  },
  [Condition.NotExpired]: {
    condition: Condition.NotExpired,
    payload: null
  },
  [Condition.BeValid]: {
    condition: Condition.BeValid,
    payload: {
      signature: 'signature'
    }
  },
  [Condition.Equals]: {
    condition: Condition.Equals,
    payload: {
      value: 'token'
    }
  }
};

export const JwtAuthorizationStrategy: FC<Props> = ({ payload, originalPayload, onChange }) => {
  const { t } = useTranslation();
  const ConditionComponent = useMemo(
    () => CONDITION_COMPONENTS[payload!.condition],
    [payload?.condition]
  );

  const handleConditionChange = (newCondition: Condition) => {
    if (newCondition === payload?.condition) {
      return;
    }

    if (newCondition === originalPayload?.condition) {
      onChange(originalPayload);
      return;
    }

    if (newCondition !== payload?.condition) {
      onChange(CONDITION_DEFAULT_PAYLOAD[newCondition]);
    }
  };

  useEffect(() => {
    if (payload) {
      return;
    }

    onChange(CONDITION_DEFAULT_PAYLOAD[payload!.condition]);
  }, []);

  return (
    <Box>
      <Box>
        <FormControl>
          <InputLabel id="select-condition">
            {t('workspace.routes.authorization.strategy.jwt.condition.title')}
          </InputLabel>
          <Select
            labelId="select-condition"
            label={t('workspace.routes.authorization.strategy.jwt.condition.title')}
            value={payload?.condition}
            onChange={(e) => handleConditionChange(e.target.value as Condition)}
          >
            {CONDITIONS.map((condition) => (
              <MenuItem key={condition} value={condition}>
                {t(`workspace.routes.authorization.strategy.jwt.condition.${condition}.title`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ pt: 2 }}>
        <ConditionComponent payload={payload?.payload} onChange={onChange} />
      </Box>
    </Box>
  );
};
