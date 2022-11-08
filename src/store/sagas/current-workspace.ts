import { call, put, takeEvery } from 'redux-saga/effects';
import {
  EXCLUDE_MEMBER_FROM_WORKSPACE,
  EXCLUDE_MEMBER_FROM_WORKSPACE_COMPLETED,
  EXCLUDE_MEMBER_FROM_WORKSPACE_FAILED,
  EXCLUDE_MEMBER_FROM_WORKSPACE_STARTED,
  FETCH_CURRENT_WORKSPACE,
  INVITE_USERS_TO_WORKSPACE,
  INVITE_USERS_TO_WORKSPACE_COMPLETED,
  INVITE_USERS_TO_WORKSPACE_FAILED,
  INVITE_USERS_TO_WORKSPACE_STARTED
} from '../actions/current-workspace';
import { workspacesApi } from './../../api/workspaces.api';
import { NetworkError } from './../../common/utils/errors';
import {
  FETCH_CURRENT_WORKSPACE_COMPLETED,
  FETCH_CURRENT_WORKSPACE_FAILED,
  FETCH_CURRENT_WORKSPACE_STARTED
} from './../actions/current-workspace';

function* fetchCurrentWorkspaceWorker({
  payload
}: ReturnType<typeof FETCH_CURRENT_WORKSPACE>): any {
  yield put(FETCH_CURRENT_WORKSPACE_STARTED());

  try {
    const response = yield call(workspacesApi.getWorkspace, String(payload?.slug));

    yield put(FETCH_CURRENT_WORKSPACE_COMPLETED(response));
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(FETCH_CURRENT_WORKSPACE_FAILED(error.message));
  }
}

function* inviteUsersToWorkspaceWorker({
  payload
}: ReturnType<typeof INVITE_USERS_TO_WORKSPACE>): any {
  if (typeof payload === 'undefined') {
    return;
  }

  yield put(INVITE_USERS_TO_WORKSPACE_STARTED());

  try {
    yield call(workspacesApi.inviteUsersToWorkspace, payload.slug, payload.emails);

    yield put(INVITE_USERS_TO_WORKSPACE_COMPLETED());
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(INVITE_USERS_TO_WORKSPACE_FAILED(error.message));
  }
}

function* deleteMemberFromWorkspace({ payload }: ReturnType<typeof EXCLUDE_MEMBER_FROM_WORKSPACE>) {
  if (typeof payload === 'undefined') {
    return;
  }
  yield put(EXCLUDE_MEMBER_FROM_WORKSPACE_STARTED());

  try {
    yield call(workspacesApi.excludeMemberFromWorkspace, payload.slug, payload.email);

    yield put(EXCLUDE_MEMBER_FROM_WORKSPACE_COMPLETED());

    yield put(FETCH_CURRENT_WORKSPACE({ slug: payload.slug }));
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(EXCLUDE_MEMBER_FROM_WORKSPACE_FAILED(error.message));
  }
}

export default function* watchCurrentWorkspace() {
  yield takeEvery(FETCH_CURRENT_WORKSPACE().type, fetchCurrentWorkspaceWorker);
  yield takeEvery(INVITE_USERS_TO_WORKSPACE().type, inviteUsersToWorkspaceWorker);
  yield takeEvery(EXCLUDE_MEMBER_FROM_WORKSPACE().type, deleteMemberFromWorkspace);
}
