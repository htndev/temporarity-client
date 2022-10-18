import { workspacesReducer } from './reducers/workspaces';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from './reducers/auth';
import rootSaga from './sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({ auth: authReducer, workspaces: workspacesReducer }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [sagaMiddleware]
});

export type RootReducer = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

export { store };
