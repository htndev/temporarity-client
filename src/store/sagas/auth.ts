import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../api';
import { User } from '../../common/types/user.type';
import { NetworkError } from '../../common/utils/errors';
import { TokensResponse } from './../../common/types/auth.type';
import {
  FETCH_USER_COMPLETED,
  GET_ME,
  LOGIN,
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
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

export default function* watchAuth() {
  yield takeEvery(LOGIN().type, loginWorker);
  yield takeEvery(SIGNUP().type, signupWorker);
  yield takeEvery(GET_ME().type, getMe);
}
