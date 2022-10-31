import { put, takeLatest, call } from 'redux-saga/effects';
import { NetworkError } from '../../common/utils/errors';
import { workspacesApi } from './../../api/workspaces.api';
import { HttpResponse } from './../../common/types/common.type';
import { Workspace } from './../../common/types/workspace.type';
import {
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_FAILED,
  FETCH_WORKSPACES_STARTED,
  FETCH_WORKSPACES_COMPLETED,
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_STARTED,
  CREATE_WORKSPACE_COMPLETED,
  CREATE_WORKSPACE_FAILED
} from './../actions/workspaces';

function* fetchWorkspaces(): Generator {
  try {
    yield put(FETCH_WORKSPACES_STARTED());
    const response: any = yield call(workspacesApi.getMyWorkspaces);

    yield put(FETCH_WORKSPACES_COMPLETED(response));
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(FETCH_WORKSPACES_FAILED(error.message));
  }
}

function* createWorkspace({
  payload: { requestData, navigate }
}: ReturnType<typeof CREATE_WORKSPACE>): Generator {
  try {
    yield put(CREATE_WORKSPACE_STARTED());
    yield call(workspacesApi.createWorkspace, requestData);
    yield put(CREATE_WORKSPACE_COMPLETED());
    yield put(FETCH_WORKSPACES());
    navigate(`/workspaces/${requestData.slug}`);
  } catch (e: any) {
    const error: NetworkError = e;
    yield put(CREATE_WORKSPACE_FAILED(error.message));
  }
}

export function* watchWorkspaces() {
  yield takeLatest(FETCH_WORKSPACES, fetchWorkspaces);

  yield takeLatest(CREATE_WORKSPACE, createWorkspace);
}
