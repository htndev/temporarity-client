import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Paper
} from '@mui/material';
import { styled } from '@mui/system';
import { isEqual } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { routesApi } from '../../api';
import { HttpMethod, Route } from '../../common/types/routes.type';
import { RootReducer } from '../../store';
import {
  ADD_ROUTE_DETAILS,
  FETCH_ROUTES,
  UPDATE_ROUTE_METHODS,
  UPDATE_ROUTE_PATH,
  UPDATE_ROUTE_STATUS
} from '../../store/actions/routes';
import { useAppSelector } from '../../store/hooks';
import { currentWorkspaceSlugSelector } from '../../store/selectors/current-workspace';
import { useToast } from '../common/toastMessage';
import { WorkspaceRouteDetails } from './WorkspaceRouteDetails';
import { WorkspaceRoutePath } from './WorkspaceRoutePath';

interface Props {
  route: Route;
}

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 4px;
  transition: transform 0.15s ease-in-out;
  cursor: pointer;
  will-change: transform, box-shadow;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const PaperBox = styled(Paper)``;

const MethodPlate = styled(PaperBox, { shouldForwardProp: (prop) => prop !== 'method' })<{
  method: HttpMethod;
}>`
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  color: ${({ theme }) => theme.palette.common.white};
  border-radius: 4px;
  background-color: ${({ method, theme }) => {
    switch (method) {
      case HttpMethod.GET:
      case HttpMethod.HEAD:
        return theme.palette.success.main;
      case HttpMethod.POST:
        return theme.palette.primary.main;
      case HttpMethod.PUT:
        return theme.palette.warning.main;
      case HttpMethod.DELETE:
        return theme.palette.error.main;
      case HttpMethod.PATCH:
        return theme.palette.info.main;
      case HttpMethod.OPTIONS:
        return theme.palette.grey[500];
      default:
        return theme.palette.grey[300];
    }
  }};
`;

const MethodsWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const WorkspaceResponseStatus = styled(PaperBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  background-color: ${({ theme }) => theme.palette.grey[300]};
`;

const WorkspaceAccordionSummary = styled(AccordionSummary)`
  margin: 0;
  padding: 0;

  .MuiAccordionSummary-content {
    margin: 0;

    &.Mui-expanded {
      margin: 0;
    }
  }
`;

const WorkspaceAccordion = styled(Accordion)`
  margin: 0;
  padding: 0;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

export const WorkspaceRoute: FC<Props> = ({ route }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const methods = useMemo(() => [...route.methods].sort(), [route.methods]);
  const currentWorkspaceSlug = useAppSelector(currentWorkspaceSlugSelector);
  const details = useAppSelector((state: RootReducer) => state.routes.routesWithDetails[route.id]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const onOpenClose = async (event: React.SyntheticEvent, isExpanded: boolean) => {
    setIsExpanded(isExpanded);

    if (isExpanded && !details) {
      setIsLoading(true);
      const data = await routesApi.getRouteDetails(currentWorkspaceSlug ?? '', route.id);
      const { response, responseType } = data;

      dispatch(ADD_ROUTE_DETAILS({ routeId: route.id, details: { response, responseType } }));
      setIsLoading(false);
    }
  };

  const updatePath = async (path: string) => {
    if (isEqual(path, route.path)) {
      return;
    }

    const savedPath = route.path;

    try {
      await routesApi.updateRoutePath(currentWorkspaceSlug ?? '', route.id, path);
      dispatch(UPDATE_ROUTE_PATH({ routeId: route.id, path }));
    } catch (error: any) {
      toast(error.response.data.message, { type: 'error' });
      dispatch(UPDATE_ROUTE_PATH({ routeId: route.id, path: savedPath }));
    }
  };

  const updateMethod = async (methods: HttpMethod[]) => {
    if (isEqual(methods, route.methods)) {
      return;
    }
    const savedMethods = [...route.methods].sort();

    try {
      await routesApi.updateRouteMethods(currentWorkspaceSlug ?? '', route.id, methods);
      toast(t('workspace.routes.update-route.methods', { route: route.path }), { type: 'success' });
      dispatch(FETCH_ROUTES());
    } catch (error: any) {
      dispatch(UPDATE_ROUTE_METHODS({ routeId: route.id, methods: savedMethods }));
      toast(error.response.data.message, { type: 'error' });
    }
  };

  const updateStatus = async (status: number) => {
    if (status === Number(route.status)) {
      return;
    }

    const previousStatus = Number(route.status);
    try {
      await routesApi.updateRouteStatus(currentWorkspaceSlug ?? '', route.id, status);
      toast(t('workspace.routes.update-route.status', { route: route.path }), { type: 'success' });
      dispatch(UPDATE_ROUTE_STATUS({ routeId: route.id, status }));
    } catch (error: any) {
      dispatch(UPDATE_ROUTE_STATUS({ routeId: route.id, status: previousStatus }));
    }
  };

  return (
    <WorkspaceAccordion expanded={isExpanded} onChange={onOpenClose}>
      <WorkspaceAccordionSummary>
        <Wrapper>
          <WorkspaceRoutePath path={route.path} />
          <MethodsWrapper>
            {methods.map((method, index) => (
              <MethodPlate key={index} method={method}>
                {method}
              </MethodPlate>
            ))}
            <WorkspaceResponseStatus>{route.status}</WorkspaceResponseStatus>
          </MethodsWrapper>
        </Wrapper>
      </WorkspaceAccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%' }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <WorkspaceRouteDetails
              route={route}
              details={details}
              onPathUpdate={updatePath}
              onMethodsUpdate={updateMethod}
              onStatusUpdate={updateStatus}
            />
          )}
        </Box>
      </AccordionDetails>
    </WorkspaceAccordion>
  );
};
