import { authReducer, AuthStateReducer } from './reducers/auth';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export interface RootReducer {
  auth: AuthStateReducer;
}

export const store = configureStore({
  reducer: combineReducers({ auth: authReducer }),
  devTools: process.env.NODE_ENV !== 'production'
});
