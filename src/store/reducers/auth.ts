import { NetworkError } from './../../common/utils/errors';
import { createReducer } from '@reduxjs/toolkit';
import { User } from './../../common/types/user.type';
import { LOGIN_COMPLETED, LOGIN_FAILED, LOGIN_STARTED } from './../actions/auth';

interface AuthStateReducer {
  user: User | null;
  isLoading: boolean;
  error: null | NetworkError;
}

export const authReducer = createReducer<AuthStateReducer>(
  {
    user: null,
    isLoading: false,
    error: null
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
      .addCase(LOGIN_FAILED, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
);
