import { Route, CreateRouteRequest } from './../../common/types/routes.type';
import { NamespaceType, HttpResponse } from './../../common/types/common.type';
import { createAction } from '@reduxjs/toolkit';

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
