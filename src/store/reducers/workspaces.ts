import { createReducer } from '@reduxjs/toolkit';
import { Workspace } from '../../common/types/workspace.type';
import { setInitialValues } from '../../common/utils/map-initial-state';
import {
  CLEAR_WORKSPACES,
  CREATE_WORKSPACE_COMPLETED,
  CREATE_WORKSPACE_FAILED,
  CREATE_WORKSPACE_STARTED,
  FETCH_WORKSPACES_COMPLETED,
  FETCH_WORKSPACES_FAILED, FETCH_WORKSPACES_STARTED
} from '../actions/workspaces';
import { WorkspaceRoutesShortTemplate } from './../../common/types/workspace.type';
import { SET_WORKSPACE_TEMPLATES } from './../actions/workspaces';

interface WorkspacesReducer {
  workspaces: Workspace[];
  templates: WorkspaceRoutesShortTemplate[];
  isFetching: boolean;
  isWorkspacesFetched: boolean;
  isCreatingWorkspace: boolean;
  error: null | string;
}

const initialState: WorkspacesReducer = {
  workspaces: [],
  templates: [],
  isFetching: false,
  isCreatingWorkspace: false,
  isWorkspacesFetched: false,
  error: null
};

export const workspacesReducer = createReducer<WorkspacesReducer>(initialState, (builder) =>
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
    .addCase(SET_WORKSPACE_TEMPLATES, (state, { payload }) => {
      state.templates = payload;
    })
    .addCase(CLEAR_WORKSPACES, (state) => {
      setInitialValues(state, initialState);
    })
);
