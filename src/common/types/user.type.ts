import { WorkspaceRole } from './workspace.type';
export interface User {
  email: string;
  fullName: string;
  profilePicture: string | null;
}

export interface WorkspaceMembershipUser extends Omit<User, 'id'> {
  role: WorkspaceRole;
}

export interface Tokens {
  access: string;
  refresh: string;
}
