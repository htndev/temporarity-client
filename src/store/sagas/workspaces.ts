import { SET_WORKSPACE_TEMPLATES } from './../actions/workspaces';
import { AxiosError } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { workspacesApi } from '../../api/workspaces.api';
import { HttpResponse } from '../../common/types/common.type';
import {
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_COMPLETED,
  CREATE_WORKSPACE_FAILED,
  CREATE_WORKSPACE_STARTED,
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_COMPLETED,
  FETCH_WORKSPACES_FAILED,
  FETCH_WORKSPACES_STARTED
} from '../actions/workspaces';

function* fetchWorkspaces(): Generator {
  try {
    yield put(FETCH_WORKSPACES_STARTED());
    const [workspacesResponse, templateResponse]: any = yield all([
      call(workspacesApi.getMyWorkspaces),
      call(workspacesApi.getTemplates)
    ]);

    yield put(FETCH_WORKSPACES_COMPLETED(workspacesResponse));
    yield put(SET_WORKSPACE_TEMPLATES(templateResponse.templates));
  } catch (e: any) {
    const error: AxiosError<HttpResponse> = e;
    yield put(FETCH_WORKSPACES_FAILED(error.response?.data.message ?? ''));
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
    const error: AxiosError<HttpResponse> = e;
    yield put(CREATE_WORKSPACE_FAILED(error.response?.data.message ?? ''));
  }
}

export default function* watchWorkspaces() {
  yield takeLatest(FETCH_WORKSPACES, fetchWorkspaces);

  yield takeLatest(CREATE_WORKSPACE, createWorkspace);
}
