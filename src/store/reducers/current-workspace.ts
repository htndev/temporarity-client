import { setInitialValues } from '../../common/utils/map-initial-state';
import { createReducer } from '@reduxjs/toolkit';
import { WorkspaceInDetails } from '../../common/types/workspace.type';
import {
  CLEAR_CURRENT_WORKSPACE,
  EXCLUDE_MEMBER_FROM_WORKSPACE_COMPLETED,
  EXCLUDE_MEMBER_FROM_WORKSPACE_FAILED,
  EXCLUDE_MEMBER_FROM_WORKSPACE_STARTED,
  FETCH_CURRENT_WORKSPACE_COMPLETED,
  FETCH_CURRENT_WORKSPACE_FAILED,
  FETCH_CURRENT_WORKSPACE_STARTED,
  INVITE_USERS_TO_WORKSPACE_COMPLETED,
  INVITE_USERS_TO_WORKSPACE_FAILED,
  INVITE_USERS_TO_WORKSPACE_STARTED
} from '../actions/current-workspace';

interface CurrentWorkspaceReducer {
  currentWorkspace: WorkspaceInDetails | null;
  isFetching: boolean;
  isUsersInviting: boolean;
  error: null | string;
  usersInviteError: null | string;
  isExcludeProcessPending: boolean;
  deleteMemberError: null | string;
}

const initialState: CurrentWorkspaceReducer = {
  currentWorkspace: null,
  isFetching: false,
  error: null,
  isUsersInviting: false,
  usersInviteError: null,
  isExcludeProcessPending: false,
  deleteMemberError: null
};

export const currentWorkspaceReducer = createReducer<CurrentWorkspaceReducer>(
  initialState,
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
      .addCase(EXCLUDE_MEMBER_FROM_WORKSPACE_STARTED, (state) => {
        state.isExcludeProcessPending = true;
        state.deleteMemberError = null;
      })
      .addCase(EXCLUDE_MEMBER_FROM_WORKSPACE_COMPLETED, (state) => {
        state.isExcludeProcessPending = false;
        state.deleteMemberError = null;
      })
      .addCase(EXCLUDE_MEMBER_FROM_WORKSPACE_FAILED, (state, { payload }) => {
        state.isExcludeProcessPending = false;
        state.deleteMemberError = payload;
      })
      .addCase(CLEAR_CURRENT_WORKSPACE, (state) => {
        setInitialValues(state, initialState);
      })
);
