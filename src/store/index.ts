import { currentWorkspaceReducer } from './reducers/current-workspace';
import { workspacesReducer } from './reducers/workspaces';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from './reducers/auth';
import rootSaga from './sagas/root';
import * as apis from '../api';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    workspaces: workspacesReducer,
    currentWorkspace: currentWorkspaceReducer
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [sagaMiddleware]
});

export type RootReducer = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

Object.values(apis).forEach((api) => api.setupInterceptors(store));

export { store };
