import { NavigationProp } from './../../common/types/navigate.type';
import { createAction } from '@reduxjs/toolkit';
import { NamespaceType } from './../../common/types/common.type';
import { Workspace } from './../../common/types/workspace.type';

const NAMESPACE = 'workspaces';

export const FETCH_WORKSPACES = createAction(`${NAMESPACE}/FETCH_WORKSPACES`);
export const FETCH_WORKSPACES_STARTED = createAction(`${NAMESPACE}/FETCH_WORKSPACES_STARTED`);
export const FETCH_WORKSPACES_COMPLETED = createAction<{ workspaces: Workspace[] }>(
  `${NAMESPACE}/FETCH_WORKSPACES_COMPLETED`
);
export const FETCH_WORKSPACES_FAILED = createAction<string>(`${NAMESPACE}/FETCH_WORKSPACES_FAILED`);

export const CREATE_WORKSPACE = createAction<
  { requestData: { name: string; slug: string; description: string } } & NavigationProp,
  NamespaceType<typeof NAMESPACE, 'CREATE_WORKSPACE'>
>(`${NAMESPACE}/CREATE_WORKSPACE`);
export const CREATE_WORKSPACE_STARTED = createAction(`${NAMESPACE}/CREATE_WORKSPACE_STARTED`);
export const CREATE_WORKSPACE_COMPLETED = createAction(`${NAMESPACE}/CREATE_WORKSPACE_COMPLETED`);
export const CREATE_WORKSPACE_FAILED = createAction<string>(`${NAMESPACE}/CREATE_WORKSPACE_FAILED`);
