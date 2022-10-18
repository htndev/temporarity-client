import { all } from 'redux-saga/effects';
import watchAuth from './auth';
import { workspacesWatcher } from './workspaces';

export default function* rootSaga() {
  yield all([watchAuth(), workspacesWatcher()]);
}
