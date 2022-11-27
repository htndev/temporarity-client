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
      <Text>{t('Authorization header should be presented')}</Text>
    </Box>
  );
};

const NotExpiredComponent: FC<ConditionProps> = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box>{t('Authorization token should not be expired')}</Box>
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
      <Input originalLabel={t('Signature')} value={signature} onChange={setSignature} />
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
      <Input originalLabel={t('Token')} value={value} onChange={setValue} />
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

export const JwtAuthorizationStrategy: FC<Props> = ({ payload: totalData, onChange }) => {
  const { t } = useTranslation();
  const [condition, setCondition] = useState(totalData?.condition || Condition.BePresented);
  const [payload, setPayload] = useState<object | null>(
    totalData?.payload || CONDITION_DEFAULT_PAYLOAD[condition]
  );
  const ConditionComponent = useMemo(() => CONDITION_COMPONENTS[condition], [condition]);

  const handleConditionChange = (newCondition: Condition) => {
    if (newCondition === condition) {
      return;
    }

    if (newCondition === totalData?.condition) {
      setPayload(totalData.payload);
    }

    if (newCondition !== condition) {
      setPayload(CONDITION_DEFAULT_PAYLOAD[newCondition]);
    }

    setCondition(newCondition);
  };

  useEffect(() => {
    if (totalData) {
      return;
    }

    onChange(CONDITION_DEFAULT_PAYLOAD[condition]);
  }, []);

  useEffect(
    () =>
      setPayload(
        totalData?.condition === condition
          ? totalData.payload
          : CONDITION_DEFAULT_PAYLOAD[condition]
      ),
    [condition]
  );

  useEffect(() => setPayload(totalData || CONDITION_DEFAULT_PAYLOAD[condition]), [totalData]);

  useEffect(() => onChange(payload), [payload]);

  return (
    <Box>
      <Box>
        <FormControl>
          <InputLabel id="select-condition">{t('Condition')}</InputLabel>
          <Select
            labelId="select-condition"
            label={t('Condition')}
            value={condition}
            onChange={(e) => handleConditionChange(e.target.value as Condition)}
          >
            {CONDITIONS.map((condition) => (
              <MenuItem key={condition} value={condition}>
                {t(`route.strategy.jwt.condition.${condition}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ pt: 2 }}>
        <ConditionComponent payload={(payload as any).payload} onChange={setPayload} />
      </Box>
    </Box>
  );
};
