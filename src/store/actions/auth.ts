import { createAction } from '@reduxjs/toolkit';
import { NamespaceType } from '../../common/types/common.type';
import { Tokens, User } from './../../common/types/user.type';

const NAMESPACE = 'auth';

export const LOGIN = createAction<
  { email: string; password: string } | undefined,
  NamespaceType<typeof NAMESPACE, 'LOGIN'>
>(`${NAMESPACE}/LOGIN`);
export const LOGIN_STARTED = createAction(`${NAMESPACE}/LOGIN_STARTED`);
export const LOGIN_COMPLETED = createAction<Tokens>(`${NAMESPACE}/LOGIN_COMPLETED`);
export const LOGIN_FAILED = createAction<string>(`${NAMESPACE}/LOGIN_FAILED`);

export const SIGNUP = createAction<
  { email: string; password: string; fullName: string } | undefined,
  NamespaceType<typeof NAMESPACE, 'SIGNUP'>
>(`${NAMESPACE}/SIGNUP`);
export const SIGNUP_STARTED = createAction(`${NAMESPACE}/SIGNUP_STARTED`);
export const SIGNUP_COMPLETED = createAction<Tokens>(`${NAMESPACE}/SIGNUP_COMPLETED`);
export const SIGNUP_FAILED = createAction<string>(`${NAMESPACE}/SIGNUP_FAILED`);

export const FETCH_USER = createAction(`${NAMESPACE}/FETCH_USER`);
export const FETCH_USER_STARTED = createAction(`${NAMESPACE}/FETCH_USER_STARTED`);
export const FETCH_USER_COMPLETED = createAction<User>(`${NAMESPACE}/FETCH_USER_COMPLETED`);
export const FETCH_USER_FAILED = createAction<string>(`${NAMESPACE}/FETCH_USER_FAILED`);

export const SET_TOKENS = createAction<Tokens>(`${NAMESPACE}/SET_TOKENS`);

export const GET_ME = createAction(`${NAMESPACE}/GET_ME`);
