import { Box } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Authorization,
  AuthorizationPayload,
  JwtStrategyConfig,
  RouteAuthorizationStrategy
} from '../../../common/types/routes.type';
import { Button } from '../../common/Button';
import { ChooseAuthorization } from './ChooseAuthorization';
import { ApiKeyAuthorizationStrategy } from './strategies/ApiKeyAuthorizationStrategy';
import { JwtAuthorizationStrategy } from './strategies/JwtAuthorizationStrategy';
import { NoneAuthorizationStrategy } from './strategies/NoneAuthorizationStrategy';

const STRATEGY_COMPONENT = {
  [RouteAuthorizationStrategy.NONE]: NoneAuthorizationStrategy,
  [RouteAuthorizationStrategy.JWT]: JwtAuthorizationStrategy,
  [RouteAuthorizationStrategy.API_KEY]: ApiKeyAuthorizationStrategy
};

interface Props {
  authorization?: Authorization;
  onChange: (authorization: Authorization) => void;
}

export const WorkspaceRouteAuthorization: FC<Props> = ({ authorization, onChange }) => {
  const { t } = useTranslation();
  const [strategy, setStrategy] = useState(
    authorization?.strategy || RouteAuthorizationStrategy.NONE
  );
  const [payload, setPayload] = useState<AuthorizationPayload>(
    authorization?.payload as AuthorizationPayload
  );
  const StrategyComponent = useMemo(() => STRATEGY_COMPONENT[strategy], [strategy]);

  const handleStrategyChange = (newStrategy: RouteAuthorizationStrategy) => {
    if (newStrategy === strategy) {
      return;
    }

    setStrategy(newStrategy);
    setPayload(
      newStrategy === authorization?.strategy ? (authorization?.payload as JwtStrategyConfig) : null
    );
  };

  const updateAuthorization = () => onChange({ strategy, payload });
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <ChooseAuthorization value={strategy} onChange={handleStrategyChange} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <StrategyComponent payload={payload as any} onChange={setPayload as any} />
      </Box>
      <Box>
        <Button onClick={updateAuthorization}>{t('common.update')}</Button>
      </Box>
    </Box>
  );
};
