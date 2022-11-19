import { Locale } from '../common/constants/locale.constant';
import { TokensResponse } from '../common/types/auth.type';
import { HttpResponse } from '../common/types/common.type';
import { Tokens, User } from '../common/types/user.type';
import { BaseApi } from './base.api';

class AuthApi extends BaseApi {
  constructor() {
    super('auth');
  }

  signIn = (payload: { email: string; password: string }): Promise<TokensResponse> =>
    this.instance.post('/credentials/signin', payload);

  signUp = (payload: {
    email: string;
    password: string;
    fullName: string;
    language: Locale;
  }): Promise<HttpResponse<Tokens>> => this.instance.post('/credentials/signup', payload);

  getTokens = (): Promise<TokensResponse> => this.instance.get('/tokens');

  getMe = (): Promise<HttpResponse<{ user: User }>> => this.instance.get('/me');

  logout = (): Promise<HttpResponse> => this.instance.post('/logout');
}

export const authApi = new AuthApi();

(window as any).api = authApi;
