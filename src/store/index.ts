import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import * as apis from '../api';
import { authReducer } from './reducers/auth';
import { currentWorkspaceReducer } from './reducers/current-workspace';
import { routesReducer } from './reducers/routes';
import { workspacesReducer } from './reducers/workspaces';
import rootSaga from './sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    workspaces: workspacesReducer,
    currentWorkspace: currentWorkspaceReducer,
    routes: routesReducer
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [sagaMiddleware]
});

export type RootReducer = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

Object.values(apis).forEach((api) => {
  api.setupInterceptors(store);
});

export { store };
