import { WorkspaceRole } from '../../common/types/workspace.type';
import { RootReducer } from './../index';

export const currentWorkspaceSelector = (state: RootReducer) =>
  state.currentWorkspace.currentWorkspace;

export const currentWorkspaceSlugSelector = (state: RootReducer) =>
  state.currentWorkspace.currentWorkspace?.slug;

export const isOwnerSelector = (state: RootReducer) => {
  const currentUser = state.currentWorkspace.currentWorkspace?.membership.find(
    (membership) => membership.email === state.auth.user?.email
  );
  return currentUser?.role === WorkspaceRole.Owner;
};
