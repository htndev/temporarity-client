import { Box, Modal } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  CreateRouteRequest,
  HttpMethod,
  WorkspaceRouteResponseType
} from '../../common/types/routes.type';
import { buildPathUrl, isValidJSON } from '../../common/utils/routes';
import { CREATE_ROUTE } from '../../store/actions/routes';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../common/Button';
import { ModalBody } from '../common/ModalBody';
import { RoutePathInput } from '../common/RoutePathInput';
import { SelectMethods } from '../common/SelectMethods';
import { StatusInput } from '../common/StatusInput';
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

export const WorkspaceCreateRouteModal: FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const createRouteError = useAppSelector((state) => state.routes.createRouteError);
  const [path, setPath] = useState('');
  const [type, setType] = useState<WorkspaceRouteResponseType>(WorkspaceRouteResponseType.Schema);
  const [selectedMethods, setSelectedMethods] = useState<HttpMethod[]>([]);
  const [response, setResponse] = useState<string | File | null>(null);
  const [responseStatus, setResponseStatus] = useState<string>('200');

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
            <RoutePathInput value={path} onChange={setPath} />
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <SelectMethods value={selectedMethods} onChange={setSelectedMethods} />
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <StatusInput value={responseStatus} onChange={setResponseStatus} />
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
