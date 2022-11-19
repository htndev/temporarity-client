import { createReducer } from '@reduxjs/toolkit';
import { Route, RouteDetails } from '../../common/types/routes.type';
import {
  ADD_ROUTE_DETAILS,
  CLEAR_ROUTES_DETAILS,
  CREATE_ROUTE_COMPLETED,
  CREATE_ROUTE_FAILED,
  CREATE_ROUTE_STARTED,
  FETCH_ROUTES_COMPLETED,
  FETCH_ROUTES_FAILED,
  FETCH_ROUTES_STARTED,
  UPDATE_ROUTE_METHODS,
  UPDATE_ROUTE_STATUS
} from '../actions/routes';

interface RoutesState {
  routes: Route[];
  routesWithDetails: { [k: string]: RouteDetails };
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
  createRouteError: null,
  routesWithDetails: {}
};

export const routesReducer = createReducer(initialState, (build) => {
  return build
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
    .addCase(ADD_ROUTE_DETAILS, (state, { payload }) => {
      if (payload) {
        state.routesWithDetails[payload.routeId] = payload.details;
      }
    })
    .addCase(CLEAR_ROUTES_DETAILS, (state) => {
      state.routesWithDetails = {};
    })
    .addCase(UPDATE_ROUTE_METHODS, (state, { payload }) => {
      const routeIndex = state.routes.findIndex((r) => r.id === payload?.routeId);

      if (payload && routeIndex !== -1) {
        state.routes[routeIndex].methods = payload.methods;
      }
    })
    .addCase(UPDATE_ROUTE_STATUS, (state, { payload }) => {
      const routeIndex = state.routes.findIndex((r) => r.id === payload?.routeId);

      if (payload && routeIndex !== -1) {
        state.routes[routeIndex].status = payload.status;
      }
    });
});
