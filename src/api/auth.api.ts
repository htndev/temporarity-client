import { Locale } from '../common/constants/locale.constant';
import { TokensResponse } from '../common/types/auth.type';
import { HttpResponse } from '../common/types/common.type';
import { Tokens, User, UserPreferences } from '../common/types/user.type';
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

  getPreferences = (): Promise<HttpResponse<{ preferences: UserPreferences }>> =>
    this.instance.get('/user-preferences');

  logout = (): Promise<HttpResponse> => this.instance.post('/logout');
}

export const authApi = new AuthApi();

(window as any).api = authApi;
