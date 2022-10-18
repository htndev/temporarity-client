import { Tokens, User } from './../common/types/user.type';
import { HttpResponse } from '../common/types/common.type';
import { BaseApi } from './base.api';
import { TokensResponse } from '../common/types/auth.type';

class AuthApi extends BaseApi {
  constructor() {
    super('auth');
  }

  signIn(payload: { email: string; password: string }): Promise<TokensResponse> {
    return this.post('/credentials/signin', { body: payload });
  }

  signUp(payload: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<HttpResponse<Tokens>> {
    return this.post('/credentials/signup', { body: payload });
  }

  getTokens(): Promise<TokensResponse> {
    return this.get('/tokens');
  }

  getMe(args: Parameters<typeof this['get']>[1]): Promise<HttpResponse<{ user: User }>> {
    return this.get('/me', args);
  }
}

export default new AuthApi();
