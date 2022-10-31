import { WorkspaceInDetails } from './../../common/types/workspace.type';
import {
  FETCH_WORKSPACES_COMPLETED,
  FETCH_WORKSPACES_FAILED,
  CREATE_WORKSPACE_STARTED,
  CREATE_WORKSPACE_COMPLETED,
  CREATE_WORKSPACE_FAILED
} from './../actions/workspaces';
import { createReducer } from '@reduxjs/toolkit';
import { Workspace } from '../../common/types/workspace.type';
import { FETCH_WORKSPACES_STARTED } from '../actions/workspaces';

interface WorkspacesReducer {
  workspaces: Workspace[];
  isFetching: boolean;
  isWorkspacesFetched: boolean;
  isCreatingWorkspace: boolean;
  error: null | string;
}

export const workspacesReducer = createReducer<WorkspacesReducer>(
  {
    workspaces: [],
    isFetching: false,
    isCreatingWorkspace: false,
    isWorkspacesFetched: false,
    error: null
  },
  (builder) =>
    builder
      .addCase(FETCH_WORKSPACES_STARTED, (state) => {
        state.isFetching = true;
        state.isWorkspacesFetched = true;
        state.workspaces = [];
      })
      .addCase(FETCH_WORKSPACES_COMPLETED, (state, { payload }) => {
        state.isFetching = false;
        state.workspaces = payload.workspaces;
      })
      .addCase(FETCH_WORKSPACES_FAILED, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(CREATE_WORKSPACE_STARTED, (state) => {
        state.isCreatingWorkspace = true;
        state.error = null;
      })
      .addCase(CREATE_WORKSPACE_COMPLETED, (state) => {
        state.isCreatingWorkspace = false;
      })
      .addCase(CREATE_WORKSPACE_FAILED, (state, { payload }) => {
        state.isCreatingWorkspace = false;
        state.error = payload;
      })
);
