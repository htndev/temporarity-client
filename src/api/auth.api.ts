import { HttpResponse } from '../common/types/common.type';
import { BaseApi } from './base.api';

class AuthApi extends BaseApi {
  constructor() {
    super('auth');
  }

  signIn(payload: { email: string; password: string }): Promise<HttpResponse> {
    return this.post('/credentials/signin', { body: payload });
  }
}

(window as any).hui = new AuthApi();

export default new AuthApi();
