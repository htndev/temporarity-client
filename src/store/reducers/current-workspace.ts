import { createReducer } from '@reduxjs/toolkit';
import { WorkspaceInDetails } from '../../common/types/workspace.type';
import {
  FETCH_CURRENT_WORKSPACE_COMPLETED,
  FETCH_CURRENT_WORKSPACE_FAILED,
  FETCH_CURRENT_WORKSPACE_STARTED,
  INVITE_USERS_TO_WORKSPACE_COMPLETED,
  INVITE_USERS_TO_WORKSPACE_FAILED,
  INVITE_USERS_TO_WORKSPACE_STARTED
} from './../actions/current-workspace';

interface CurrentWorkspaceReducer {
  currentWorkspace: WorkspaceInDetails | null;
  isFetching: boolean;
  isUsersInviting: boolean;
  error: null | string;
  usersInviteError: null | string;
}

export const currentWorkspaceReducer = createReducer<CurrentWorkspaceReducer>(
  {
    currentWorkspace: null,
    isFetching: false,
    error: null,
    isUsersInviting: false,
    usersInviteError: null
  },
  (builder) =>
    builder
      .addCase(FETCH_CURRENT_WORKSPACE_STARTED, (state) => {
        state.isFetching = true;
        state.currentWorkspace = null;
      })
      .addCase(FETCH_CURRENT_WORKSPACE_COMPLETED, (state, { payload }) => {
        state.isFetching = false;
        state.currentWorkspace = payload.workspace;
      })
      .addCase(FETCH_CURRENT_WORKSPACE_FAILED, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(INVITE_USERS_TO_WORKSPACE_STARTED, (state) => {
        state.isUsersInviting = true;
      })
      .addCase(INVITE_USERS_TO_WORKSPACE_COMPLETED, (state) => {
        state.isUsersInviting = false;
      })
      .addCase(INVITE_USERS_TO_WORKSPACE_FAILED, (state, { payload }) => {
        state.isUsersInviting = false;
        state.usersInviteError = payload;
      })
);
