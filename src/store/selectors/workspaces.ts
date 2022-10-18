import { WorkspaceRole } from '../../common/types/workspace.type';
import { RootReducer } from './../index';

export const workspacesSelector = (state: RootReducer) => state.workspaces.workspaces;

export const myWorkspacesSelector = (state: RootReducer) =>
  state.workspaces.workspaces.filter((workspace) => {
    const membership = workspace.membership.find(
      (membership) => membership.id === state.auth.user?.id
    );

    return membership?.role === WorkspaceRole.Owner;
  });

export const sharedWorkspacesSelector = (state: RootReducer) =>
  state.workspaces.workspaces.filter((workspace) => {
    const membership = workspace.membership.find(
      (membership) => membership.id === state.auth.user?.id
    );

    return membership?.role === WorkspaceRole.Editor;
  });
