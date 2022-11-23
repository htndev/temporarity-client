import { AxiosError } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../api';
import { preferencesApi } from '../../api/preferences.api';
import { TokensResponse } from '../../common/types/auth.type';
import { HttpResponse } from '../../common/types/common.type';
import { User, UserPreferences } from '../../common/types/user.type';
import {
  CLEAR_USER,
  FETCH_USER_COMPLETED,
  GET_ME,
  LOGIN,
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
  LOGOUT, SET_PREFERENCES, SIGNUP,
  SIGNUP_COMPLETED,
  SIGNUP_FAILED,
  SIGNUP_STARTED
} from '../actions/auth';
import { CLEAR_CURRENT_WORKSPACE } from '../actions/current-workspace';
import { CLEAR_WORKSPACES } from '../actions/workspaces';

function* loginWorker({ payload }: ReturnType<typeof LOGIN>) {
  try {
    yield put(LOGIN_STARTED());

    const response: TokensResponse = yield call(authApi.signIn, payload as any);

    yield put(
      LOGIN_COMPLETED({ access: response.tokens.access, refresh: response.tokens.refresh })
    );
  } catch (e: any) {
    const error: AxiosError<HttpResponse> = e;
    yield put(LOGIN_FAILED(error?.response?.data?.message ?? ''));
  }
}

function* signupWorker({ payload }: ReturnType<typeof SIGNUP>) {
  try {
    yield put(SIGNUP_STARTED());

    const response: TokensResponse = yield call(authApi.signUp, payload as any);

    yield put(
      SIGNUP_COMPLETED({ access: response.tokens.access, refresh: response.tokens.refresh })
    );
  } catch (e: any) {
    const error: AxiosError<HttpResponse> = e;
    yield put(SIGNUP_FAILED(error?.response?.data?.message ?? ''));
  }
}

function* getMe(): Generator {
  try {
    // @ts-ignore
    const [authResponse, preferencesResponse]: [{ user: User }, { preferences: UserPreferences }] =
      yield all([call(authApi.getMe), call(preferencesApi.getPreferences)]) as any;

    yield put(FETCH_USER_COMPLETED(authResponse.user));
    yield put(SET_PREFERENCES(preferencesResponse.preferences));
  } catch (e: any) {
    const error: AxiosError<HttpResponse> = e;

    yield put(LOGIN_FAILED(error?.response?.data?.message ?? ''));
  }
}

function* logoutWorker() {
  yield call(authApi.logout);

  yield put(CLEAR_USER());
  yield put(CLEAR_WORKSPACES());
  yield put(CLEAR_CURRENT_WORKSPACE());
}

export default function* watchAuth() {
  yield takeEvery(LOGIN().type, loginWorker);
  yield takeEvery(SIGNUP().type, signupWorker);
  yield takeEvery(GET_ME().type, getMe);
  yield takeEvery(LOGOUT().type, logoutWorker);
}
