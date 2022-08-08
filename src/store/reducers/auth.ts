import { createReducer } from '@reduxjs/toolkit';
import { User } from './../../common/types/user.type';
import { LOGIN_COMPLETED, LOGIN_FAILED, LOGIN_STARTED } from './../actions/auth';

export interface AuthStateReducer {
  user: User | null;
  isLoading: boolean;
}

export const authReducer = createReducer<AuthStateReducer>(
  {
    user: null,
    isLoading: false
  },
  (builder) =>
    builder
      .addCase(LOGIN_STARTED, (state) => {
        state.isLoading = true;
      })
      .addCase(LOGIN_COMPLETED, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(LOGIN_FAILED, (state) => {
        state.isLoading = false;
      })
);
