import { createAction } from '@reduxjs/toolkit';
import { NetworkError } from '../../common/utils/errors';
import { User } from './../../common/types/user.type';

const NAMESPACE = 'auth';
type NamespaceType<T extends string> = `${typeof NAMESPACE}/${T}`;

export const LOGIN = createAction<
  { email: string; password: string } | undefined,
  NamespaceType<'LOGIN'>
>(`${NAMESPACE}/LOGIN`);
export const LOGIN_STARTED = createAction(`${NAMESPACE}/LOGIN_STARTED`);
export const LOGIN_COMPLETED = createAction<User>(`${NAMESPACE}/LOGIN_COMPLETED`);
export const LOGIN_FAILED = createAction<NetworkError>(`${NAMESPACE}/LOGIN_FAILED`);
