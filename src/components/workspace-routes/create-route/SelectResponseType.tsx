import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkspaceRouteResponseType } from '../../../common/types/routes.type';

interface Props {
  onChange: (value: WorkspaceRouteResponseType) => void;
  defaultValue?: WorkspaceRouteResponseType;
}

export const SelectResponseType: FC<Props> = ({ onChange, defaultValue }) => {
  const { t } = useTranslation();
  const [type, setType] = useState<WorkspaceRouteResponseType>(
    defaultValue ?? WorkspaceRouteResponseType.Schema
  );

  const handleChange = (_: any, type: WorkspaceRouteResponseType) => {
    setType(type);
  };

  useEffect(() => {
    onChange(type);
  }, [type]);

  return (
    <div>
      <ToggleButtonGroup color="primary" value={type} onChange={handleChange} exclusive fullWidth>
        <ToggleButton value={WorkspaceRouteResponseType.Schema}>
          {t('workspace.routes.create-route-modal.type.schema.title')}
        </ToggleButton>
        <ToggleButton value={WorkspaceRouteResponseType.File}>
          {t('workspace.routes.create-route-modal.type.file.title')}
        </ToggleButton>
        <ToggleButton value={WorkspaceRouteResponseType.RandomImage}>
          {t('workspace.routes.create-route-modal.type.random-image.title')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
