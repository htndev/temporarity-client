import { createAction } from '@reduxjs/toolkit';
import { HttpResponse, NamespaceType } from '../../common/types/common.type';
import {
  CreateRouteRequest,
  Route,
  RouteDetails,
  HttpMethod
} from '../../common/types/routes.type';

const NAMESPACE = 'routes';

export const FETCH_ROUTES = createAction<
  { slug: string } | undefined,
  NamespaceType<typeof NAMESPACE, 'FETCH_ROUTES'>
>(`${NAMESPACE}/FETCH_ROUTES`);
export const FETCH_ROUTES_STARTED = createAction(`${NAMESPACE}/FETCH_ROUTES_STARTED`);
export const FETCH_ROUTES_COMPLETED = createAction<HttpResponse<{ routes: Route[] }>>(
  `${NAMESPACE}/FETCH_ROUTES_COMPLETED`
);
export const FETCH_ROUTES_FAILED = createAction<string>(`${NAMESPACE}/FETCH_ROUTES_FAILED`);

export const CREATE_ROUTE = createAction<
  CreateRouteRequest | undefined,
  NamespaceType<typeof NAMESPACE, 'CREATE_ROUTE'>
>(`${NAMESPACE}/CREATE_ROUTE`);
export const CREATE_ROUTE_STARTED = createAction(`${NAMESPACE}/CREATE_ROUTE_STARTED`);
export const CREATE_ROUTE_COMPLETED = createAction(`${NAMESPACE}/CREATE_ROUTE_COMPLETED`);
export const CREATE_ROUTE_FAILED = createAction<string>(`${NAMESPACE}/CREATE_ROUTE_FAILED`);

export const ADD_ROUTE_DETAILS = createAction<
  { routeId: string; details: RouteDetails } | undefined,
  NamespaceType<typeof NAMESPACE, 'ADD_ROUTE_DETAILS'>
>(`${NAMESPACE}/ADD_ROUTE_DETAILS`);

export const CLEAR_ROUTES_DETAILS = createAction(`${NAMESPACE}/CLEAR_ROUTES_DETAILS`);

export const UPDATE_ROUTE_METHODS = createAction<
  { routeId: string; methods: HttpMethod[] } | undefined,
  NamespaceType<typeof NAMESPACE, 'UPDATE_ROUTE_METHODS'>
>(`${NAMESPACE}/UPDATE_ROUTE_METHODS`);

export const UPDATE_ROUTE_STATUS = createAction<
  { routeId: string; status: number } | undefined,
  NamespaceType<typeof NAMESPACE, 'UPDATE_ROUTE_STATUS'>
>(`${NAMESPACE}/UPDATE_ROUTE_STATUS`);

export const UPDATE_ROUTE_PATH = createAction<
  { routeId: string; path: string } | undefined,
  NamespaceType<typeof NAMESPACE, 'UPDATE_ROUTE_PATH'>
>(`${NAMESPACE}/UPDATE_ROUTE_PATH`);
