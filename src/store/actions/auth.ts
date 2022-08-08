import { createAction } from '@reduxjs/toolkit';
import { User } from './../../common/types/user.type';

const NAMESPACE = 'auth';

export const LOGIN_STARTED = createAction(`${NAMESPACE}/LOGIN_STARTED`);
export const LOGIN_COMPLETED = createAction<User>(`${NAMESPACE}/LOGIN_COMPLETED`);
export const LOGIN_FAILED = createAction(`${NAMESPACE}/LOGIN_FAILED`);
