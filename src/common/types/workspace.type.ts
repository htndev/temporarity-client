export enum WorkspaceRole {
  Owner = 'owner',
  Editor = 'editor'
}

export interface WorkspaceMembership {
  fullName: string;
  email: string;
  id: string;
  profilePicture: string | null;
  role: WorkspaceRole;
}

export interface Workspace {
  id: number;
  name: string;
  description: string;
  slug: string;
  membership: WorkspaceMembership[];
}
