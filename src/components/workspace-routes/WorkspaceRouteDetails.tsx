import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { routesApi } from '../../api';
import {
  Authorization,
  HttpMethod,
  Route,
  RouteDetails,
  WorkspaceRouteResponseType
} from '../../common/types/routes.type';
import { isValidJSON } from '../../common/utils/routes';
import { FETCH_ROUTES } from '../../store/actions/routes';
import { useAppSelector } from '../../store/hooks';
import { currentWorkspaceSlugSelector } from '../../store/selectors/current-workspace';
import { Button } from '../common/Button';
import { RoutePathInput } from '../common/RoutePathInput';
import { SelectMethods } from '../common/SelectMethods';
import { StatusInput } from '../common/StatusInput';
import { useToast } from '../common/toastMessage';
import { SelectResponseType } from './create-route/SelectResponseType';
import { Response } from './response-type/Response';
import { WorkspaceRouteAuthorization } from './route-authorization/WorkspaceRouteAuthorization';

interface Props {
  route: Route;
  details: RouteDetails;
  onPathUpdate: (value: string) => void | Promise<void>;
  onMethodsUpdate: (value: HttpMethod[]) => void | Promise<void>;
  onStatusUpdate: (value: number) => void | Promise<void>;
  onResponseUpdate: (data: Pick<RouteDetails, 'response' | 'responseType'>) => void | Promise<void>;
}

export const WorkspaceRouteDetails: FC<Props> = ({
  route,
  details,
  onPathUpdate,
  onMethodsUpdate,
  onStatusUpdate,
  onResponseUpdate
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const slug = useAppSelector(currentWorkspaceSlugSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState(route.path);
  const [methods, setMethods] = useState<HttpMethod[]>(route.methods);
  const [status, setStatus] = useState(String(route.status));
  const [responseType, setResponseType] = useState(details?.responseType);
  const [newResponse, setNewResponse] = useState<File | object | null | string>(null);

  const onMethodChange = (value: HttpMethod[]) => {
    setMethods(value);
    onMethodsUpdate(value);
  };

  const onStatusChange = (value: string) => {
    setStatus(String(value));
    onStatusUpdate(Number(value));
  };
  const onResponseTypeChange = (value: WorkspaceRouteResponseType) => {
    setResponseType(value);

    if (value === WorkspaceRouteResponseType.RandomImage) {
      setNewResponse(null);
    }
  };
  const onResponseContentChange = (value: File | object | null | string) => setNewResponse(value);
  const isAllowedToSubmit = () => {
    switch (responseType) {
      case WorkspaceRouteResponseType.File: {
        if (newResponse === null) {
          toast(t('workspace.routes.update-route.error.file'), { type: 'error' });
          return false;
        }
        return true;
      }
      case WorkspaceRouteResponseType.Schema: {
        if (!isValidJSON(newResponse as string)) {
          toast(t('workspace.routes.update-route.error.schema'), { type: 'error' });
          return false;
        }
        return true;
      }
      case WorkspaceRouteResponseType.RandomImage:
      default:
        return true;
    }
  };
  const onResponseBodyUpdate = () => {
    if (!isAllowedToSubmit()) {
      return;
    }

    let response = newResponse;

    if (responseType === WorkspaceRouteResponseType.Schema) {
      if (!isValidJSON(newResponse as string)) {
        return;
      }
      response = JSON.parse(newResponse as string);
    }

    onResponseUpdate({ responseType, response });
  };
  const deleteRoute = async () => {
    const deletingRoute = route;
    try {
      const grantedSlug = slug ?? '';
      await routesApi.deleteRoute(grantedSlug, route.id);
      toast(
        t('workspace.routes.delete-route.success', {
          path: `/${deletingRoute.path}`,
          methods: deletingRoute.methods.join(', ')
        }),
        { type: 'success' }
      );
      dispatch(FETCH_ROUTES({ slug: grantedSlug }));
    } catch (error: any) {
      toast(error.response.data.message, { type: 'error' });
    }
  };
  const handleAuthorizationChange = async (payload: Authorization) => {
    try {
      await routesApi.updateRouteAuthorization(slug ?? '', route.id, payload);
      toast(t('workspace.routes.update-route.authorization.success'), { type: 'success' });
    } catch (e: any) {
      const errorMessage = e.response?.data?.message ?? e.message;

      toast(errorMessage, { type: 'error' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
        <Button variant="contained" color="error" onClick={deleteRoute}>
          {t('common.delete')}
        </Button>
      </Box>
      <Box>
        <RoutePathInput value={value} onChange={setValue} onBlur={() => onPathUpdate(value)} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <SelectMethods value={methods} onChange={onMethodChange} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <StatusInput value={status} onChange={onStatusChange} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <WorkspaceRouteAuthorization
          authorization={details?.authorization}
          onChange={handleAuthorizationChange}
        />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <SelectResponseType defaultValue={responseType} onChange={onResponseTypeChange} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Response
          status={Number(status)}
          responseType={responseType}
          response={details?.response}
          onChange={onResponseContentChange}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onResponseBodyUpdate} variant="contained">
          {t('common.update')}
        </Button>
      </Box>
    </Box>
  );
};
