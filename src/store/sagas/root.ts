import { all } from 'redux-saga/effects';
import watchAuth from './auth';
import watchCurrentWorkspace from './current-workspace';
import { watchWorkspaces } from './workspaces';

export default function* rootSaga() {
  yield all([watchAuth(), watchWorkspaces(), watchCurrentWorkspace()]);
}
