import { WorkspaceMembershipUser } from './user.type';

export enum WorkspaceRole {
  Owner = 'owner',
  Editor = 'editor'
}

export interface Workspace {
  id: number;
  name: string;
  description: string;
  slug: string;
  membership: WorkspaceMembershipUser[];
}

export interface WorkspaceInDetails extends Workspace {
  apiKey: string;
}

export interface WorkspaceRoutesShortTemplate {
  name: string;
  keyword: string;
  description: string;
}
