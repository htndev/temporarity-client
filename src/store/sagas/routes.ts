import { CLEAR_ROUTES_DETAILS } from './../actions/routes';
import { AxiosError } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { routesApi } from '../../api';
import { HttpResponse } from '../../common/types/common.type';
import { Route } from '../../common/types/routes.type';
import {
  CREATE_ROUTE,
  CREATE_ROUTE_COMPLETED,
  CREATE_ROUTE_FAILED,
  CREATE_ROUTE_STARTED,
  FETCH_ROUTES,
  FETCH_ROUTES_COMPLETED,
  FETCH_ROUTES_STARTED,
  UPDATE_ROUTE_PATH
} from '../actions/routes';
import { currentWorkspaceSlugSelector } from '../selectors/current-workspace';

function* fetchRoutesWorker({ payload }: ReturnType<typeof FETCH_ROUTES>) {
  yield put(FETCH_ROUTES_STARTED());
  yield put(CLEAR_ROUTES_DETAILS());

  try {
    const response = (yield call(routesApi.getRoutes, payload?.slug ?? '')) as HttpResponse<{
      routes: Route[];
    }>;
    yield put(FETCH_ROUTES_COMPLETED(response));
  } catch (error: any) {
    yield put(FETCH_ROUTES_COMPLETED(error.message));
  }
}

function* createRouteWorker({ payload }: ReturnType<typeof CREATE_ROUTE>) {
  yield put(CREATE_ROUTE_STARTED());

  try {
    const slug = (yield select(currentWorkspaceSlugSelector)) as string;
    (yield call(routesApi.createRoute, slug, payload!)) as HttpResponse;
    yield put(CREATE_ROUTE_COMPLETED());
    yield put(FETCH_ROUTES({ slug }));
  } catch (e: any) {
    const error = e as AxiosError;
    yield put(CREATE_ROUTE_FAILED((error.response?.data as any).message ?? e.message));
  }
}

function* updateRoutePathWorker({ payload }: ReturnType<typeof UPDATE_ROUTE_PATH>) {
  const slug = (yield select(currentWorkspaceSlugSelector)) as string;
  yield put(FETCH_ROUTES({ slug }));
}

export default function* watchRoutes() {
  yield takeEvery(FETCH_ROUTES().type, fetchRoutesWorker);
  yield takeEvery(CREATE_ROUTE().type, createRouteWorker);
  yield takeEvery(UPDATE_ROUTE_PATH().type, updateRoutePathWorker);
}
