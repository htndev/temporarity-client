import {
  Autocomplete,
  Box,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { uniq } from 'lodash';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { HTTP_METHODS, RESPONSE_STATUS } from '../../common/constants/routes.constant';
import {
  CreateRouteRequest,
  HttpMethod,
  WorkspaceRouteResponseType
} from '../../common/types/routes.type';
import { isValidJSON } from '../../common/utils/routes';
import { isEmptyValidator } from '../../common/utils/validators';
import { CREATE_ROUTE } from '../../store/actions/routes';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ModalBody } from '../common/ModalBody';
import { useToast } from '../common/toastMessage';
import { Text } from '../common/typography/Text';
import { CreateFileRouteResponse } from './create-route/CreateFileRouteResponse';
import { CreateRandomImageRouteResponse } from './create-route/CreateRandomImageRouteResponse';
import { CreateSchemaRouteResponse } from './create-route/CreateSchemaRouteResponse';
import { SelectResponseType } from './create-route/SelectResponseType';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const buildPathUrl = (path: string) => {
  const url = new URL(path, window.location.origin);
  const baseUrl = url.pathname.endsWith('/')
    ? url.pathname.slice(0, url.pathname.length - 1)
    : url.pathname;

  return baseUrl;
};

const MAPPED_HTTP_STATUS = Object.keys(RESPONSE_STATUS);

export const WorkspaceCreateRouteModal: FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const routes = useAppSelector((state) => state.routes.routes);
  const createRouteError = useAppSelector((state) => state.routes.createRouteError);
  const [path, setPath] = useState('');
  const [type, setType] = useState<WorkspaceRouteResponseType>(WorkspaceRouteResponseType.Schema);
  const [selectedMethods, setSelectedMethods] = useState<HttpMethod[]>([]);
  const [response, setResponse] = useState<string | File | null>(null);
  const [responseStatus, setResponseStatus] = useState<string>('200');

  const routeValidator = useCallback(
    (value: string) => {
      const route = routes.find((route) => route.path === value);

      return route ? t('workspace.routes.create-route-modal.error.path.exists') : true;
    },
    [routes]
  );

  const closeModal = () => {
    setPath('');
    onClose();
  };

  const onToggle = (type: WorkspaceRouteResponseType) => {
    setType(type);

    if (type === WorkspaceRouteResponseType.RandomImage) {
      setResponse(null);
    }
  };

  const handleMethodsSelect = (_: any, newMethods: HttpMethod[]) => {
    setSelectedMethods(newMethods);
  };

  const handleResponseChange = useCallback((value: string | File) => setResponse(value), []);

  const renderCorrespondingType = useCallback(() => {
    switch (type) {
      case WorkspaceRouteResponseType.Schema:
        return <CreateSchemaRouteResponse onChange={handleResponseChange} />;
      case WorkspaceRouteResponseType.File:
        return <CreateFileRouteResponse onChange={handleResponseChange} />;
      case WorkspaceRouteResponseType.RandomImage:
        return <CreateRandomImageRouteResponse />;
    }
  }, [type]);

  const submitRoute = () => {
    if (!path || !selectedMethods.length || !responseStatus) {
      return;
    }

    if (type === WorkspaceRouteResponseType.Schema && !isValidJSON(response as string)) {
      return;
    }

    const routeData: CreateRouteRequest = {
      path: buildPathUrl(path),
      response: response !== null && !(response instanceof File) ? JSON.parse(response) : response,
      responseType: type,
      methods: selectedMethods,
      status: Number(responseStatus)
    };

    dispatch(CREATE_ROUTE(routeData));

    closeModal();
    setPath('');
    setSelectedMethods([]);
    setResponse(null);
    setResponseStatus('200');
  };

  const emptyValidator = useMemo(
    () => isEmptyValidator(t('workspace.routes.create-route-modal.error.path.empty')),
    []
  );

  useEffect(() => {
    if (createRouteError) {
      toast(createRouteError, { type: 'error' });
    }
  }, [createRouteError]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalBody width="600px">
        <header>
          <Text as="h5">{t('workspace.routes.create-route-modal.title')}</Text>
        </header>
        <main>
          <Box>
            <Input
              value={path}
              onChange={setPath}
              rules={[emptyValidator, routeValidator]}
              placeholder={t('workspace.routes.create-route-modal.field.path')}
              fullWidth
            />
            <Text as="subtitle2">{t('workspace.routes.hints.dynamic-param')}</Text>
            <Text as="subtitle2">{t('workspace.routes.hints.wildcard-param')}</Text>
            <Text as="subtitle2">{t('workspace.routes.hints.double-wildcard-param')}</Text>
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <ToggleButtonGroup value={selectedMethods} onChange={handleMethodsSelect} fullWidth>
              {HTTP_METHODS.map((status) => (
                <ToggleButton value={status} key={status}>
                  {status}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Autocomplete
              freeSolo
              value={responseStatus}
              options={MAPPED_HTTP_STATUS as []}
              renderInput={(params) => <TextField {...params} />}
              renderOption={(props: any, option: keyof typeof RESPONSE_STATUS) => (
                <Box component="li" sx={{ mt: 2, '&:not(:last-child)': { mb: 2 } }} {...props}>
                  <Text as="caption">
                    {option} ({RESPONSE_STATUS[option]})
                  </Text>
                </Box>
              )}
              onChange={(_, value) => setResponseStatus(value as string)}
            />
          </Box>
          <Box>
            <SelectResponseType
              onChange={onToggle}
              defaultValue={WorkspaceRouteResponseType.Schema}
            />
            {renderCorrespondingType()}
          </Box>
        </main>
        <footer>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={closeModal} variant="text" color="error">
              {t('common.cancel')}
            </Button>
            <Button sx={{ ml: 2 }} onClick={submitRoute} variant="contained">
              {t('common.create')}
            </Button>
          </Box>
        </footer>
      </ModalBody>
    </Modal>
  );
};
