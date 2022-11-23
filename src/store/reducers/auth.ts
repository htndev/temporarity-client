import { SET_PREFERENCES, SET_FULL_NAME, SET_EMAIL, SET_LANGUAGE } from '../actions/auth';
import { DEFAULT_LOCALE } from '../../common/constants/locale.constant';
import { UserPreferences } from '../../common/types/user.type';
import { setInitialValues } from '../../common/utils/map-initial-state';
import { createReducer } from '@reduxjs/toolkit';
import { Tokens, User } from '../../common/types/user.type';
import {
  CLEAR_USER,
  FETCH_USER_COMPLETED,
  FETCH_USER_FAILED,
  FETCH_USER_STARTED,
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
  SET_TOKENS,
  SIGNUP_COMPLETED,
  SIGNUP_STARTED
} from '../actions/auth';

interface AuthStateReducer {
  user: User | null;
  tokens: null | Tokens;
  isLoading: boolean;
  error: null | string;
  preferences: UserPreferences;
}

const initialState: AuthStateReducer = {
  user: null,
  tokens: null,
  isLoading: false,
  error: null,
  preferences: {
    language: DEFAULT_LOCALE
  }
};

export const authReducer = createReducer<AuthStateReducer>(initialState, (builder) =>
  builder
    .addCase(LOGIN_STARTED, (state) => {
      state.isLoading = true;
    })
    .addCase(LOGIN_COMPLETED, (state, action) => {
      state.isLoading = false;
      state.tokens = action.payload;
    })
    .addCase(LOGIN_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(SIGNUP_STARTED, (state) => {
      state.isLoading = true;
    })
    .addCase(SIGNUP_COMPLETED, (state, action) => {
      state.isLoading = false;
      state.tokens = action.payload;
    })
    .addCase(FETCH_USER_STARTED, (state, action) => {
      state.isLoading = true;
    })
    .addCase(FETCH_USER_COMPLETED, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(FETCH_USER_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(SET_TOKENS, (state, action) => {
      state.tokens = action.payload;
    })
    .addCase(SET_PREFERENCES, (state, action) => {
      state.preferences = action.payload;
    })
    .addCase(SET_FULL_NAME, (state, action) => {
      state.user!.fullName = action.payload;
    })
    .addCase(SET_EMAIL, (state, action) => {
      state.user!.email = action.payload;
    })
    .addCase(SET_LANGUAGE, (state, action) => {
      state.preferences.language = action.payload;
    })
    .addCase(CLEAR_USER, (state) => {
      setInitialValues(state, initialState);
    })
);
