import { Locale } from '../common/constants/locale.constant';
import { HttpResponse } from '../common/types/common.type';
import { UserPreferences } from '../common/types/user.type';
import { Tokens } from '../common/types/user.type';
import { BaseApi } from './base.api';

class PreferencesApi extends BaseApi {
  constructor() {
    super('user-preferences');
  }

  getPreferences = (): Promise<HttpResponse<{ preferences: UserPreferences }>> =>
    this.instance.get('/');

  updateGeneralPreferences = (data: {
    fullName: string;
    email: string;
  }): Promise<HttpResponse<{ tokens: Tokens }>> => this.instance.patch('/general', data);

  updatePrivacyPreferences = (data: {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }): Promise<HttpResponse> => this.instance.patch('/privacy', data);

  updateLanguagePreferences = (data: { language: Locale }): Promise<HttpResponse> =>
    this.instance.patch('/language', data);
}

export const preferencesApi = new PreferencesApi();
