import { createReducer } from '@reduxjs/toolkit';
import { Route } from '../../common/types/routes.type';
import {
  CREATE_ROUTE_COMPLETED,
  CREATE_ROUTE_FAILED, CREATE_ROUTE_STARTED, FETCH_ROUTES_COMPLETED, FETCH_ROUTES_FAILED, FETCH_ROUTES_STARTED
} from './../actions/routes';

interface RoutesState {
  routes: Route[];
  isFetchingRoutes: boolean;
  fetchRoutesError: null | string;
  isCreatingRoute: boolean;
  createRouteError: null | string;
}

const initialState: RoutesState = {
  routes: [],
  isFetchingRoutes: false,
  fetchRoutesError: null,
  isCreatingRoute: false,
  createRouteError: null
};

export const routesReducer = createReducer(initialState, (build) =>
  build
    .addCase(FETCH_ROUTES_STARTED, (state) => {
      state.isFetchingRoutes = true;
      state.routes = [];
    })
    .addCase(FETCH_ROUTES_COMPLETED, (state, { payload }) => {
      state.isFetchingRoutes = false;
      state.routes = payload.routes;
    })
    .addCase(FETCH_ROUTES_FAILED, (state, { payload }) => {
      state.isFetchingRoutes = false;
      state.fetchRoutesError = payload;
    })
    .addCase(CREATE_ROUTE_STARTED, (state) => {
      state.isCreatingRoute = true;
      state.createRouteError = null;
    })
    .addCase(CREATE_ROUTE_COMPLETED, (state) => {
      state.isCreatingRoute = false;
      state.createRouteError = null;
    })
    .addCase(CREATE_ROUTE_FAILED, (state, { payload }) => {
      state.isCreatingRoute = false;
      state.createRouteError = payload;
    })
);
