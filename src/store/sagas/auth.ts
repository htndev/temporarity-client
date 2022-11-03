import { CLEAR_WORKSPACES } from './../actions/workspaces';
import { CLEAR_CURRENT_WORKSPACE } from './../actions/current-workspace';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../api';
import { User } from '../../common/types/user.type';
import { NetworkError } from '../../common/utils/errors';
import { TokensResponse } from './../../common/types/auth.type';
import {
  CLEAR_USER,
  FETCH_USER_COMPLETED,
  GET_ME,
  LOGIN,
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
  LOGOUT,
  SIGNUP,
  SIGNUP_COMPLETED,
  SIGNUP_FAILED,
  SIGNUP_STARTED
} from './../actions/auth';

function* loginWorker({ payload }: ReturnType<typeof LOGIN>) {
  try {
    yield put(LOGIN_STARTED());

    const response: TokensResponse = yield call(authApi.signIn, payload as any);

    yield put(
      LOGIN_COMPLETED({ access: response.tokens.access, refresh: response.tokens.refresh })
    );
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(LOGIN_FAILED(error.message));
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
    const error: NetworkError = e;
    yield put(SIGNUP_FAILED(error.message));
  }
}

function* getMe(): Generator {
  try {
    const response = (yield call(authApi.getMe)) as { user: User };

    yield put(FETCH_USER_COMPLETED(response.user));
  } catch (e: any) {
    const error: NetworkError = e;

    yield put(LOGIN_FAILED(error.message));
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
