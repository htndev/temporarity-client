import { HttpResponse } from './../../common/types/common.type';
import { call, put, takeEvery } from 'redux-saga/effects';
import authApi from '../../api/auth.api';
import { LOGIN, LOGIN_COMPLETED, LOGIN_FAILED, LOGIN_STARTED } from './../actions/auth';
import { NetworkError } from '../../common/utils/errors';

function* loginWorker({ payload }: ReturnType<typeof LOGIN>) {
  try {
    yield put(LOGIN_STARTED());
    const value: HttpResponse = yield call(authApi.signIn.bind(authApi), payload as any);
    yield put(LOGIN_COMPLETED({ id: 1, name: 'qwe', email: 'qweqweqwe' }));
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(LOGIN_FAILED(error));
  }
}

export default function* watchAuth() {
  yield takeEvery(LOGIN().type, loginWorker);
}
