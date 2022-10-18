import { call, select } from 'redux-saga/effects';
import { Tokens } from '../../../common/types/user.type';
import { RootReducer } from './../../index';

export function* callMethodWithAuthorization<Fn extends (...args: any[]) => any>(
  fn: Fn,
  authorization: 'access' | 'refresh',
  args?: Parameters<Fn>
): Generator {
  const tokens = (yield select((state: RootReducer) => state.auth.tokens as Tokens)) as Tokens;
  const headers = { Authorization: `Bearer ${tokens[authorization]}` };
  const payload = { body: args, headers: { ...((args as any)?.headers || {}), ...headers } };
  const response = yield call(fn as any, payload);

  return response;
}
