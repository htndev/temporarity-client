import { Locale } from '../constants/locale.constant';
import { WorkspaceRole } from './workspace.type';

export interface User {
  email: string;
  fullName: string;
  profilePicture: string | null;
  isOauthUser: boolean;
}

export interface WorkspaceMembershipUser extends Omit<User, 'id'> {
  role: WorkspaceRole;
}

export interface UserPreferences {
  language: Locale;
}

export interface Tokens {
  access: string;
  refresh: string;
}
