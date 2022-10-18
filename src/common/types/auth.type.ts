import { HttpResponse } from './common.type';
import { Tokens } from './user.type';

export enum OAuth {
  Github = 'github',
  Google = 'google',
  Facebook = 'facebook'
}

export type TokensResponse = HttpResponse<{ tokens: Tokens }>;

export interface AuthContextType {
  isAllowedAccessToApp: boolean;
  doTokensFetched: boolean;
  setIsAllowedAccessToApp: (value: boolean) => void;
  setDoTokensFetched: (value: boolean) => void;
}
