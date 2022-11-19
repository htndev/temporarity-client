import { createAction } from '@reduxjs/toolkit';
import { NamespaceType } from '../../common/types/common.type';
import { WorkspaceInDetails } from '../../common/types/workspace.type';

export const NAMESPACE = 'current-workspace';

export const FETCH_CURRENT_WORKSPACE = createAction<
  { slug: string } | undefined,
  NamespaceType<typeof NAMESPACE, 'FETCH_CURRENT_WORKSPACE'>
>(`${NAMESPACE}/FETCH_CURRENT_WORKSPACE`);
export const FETCH_CURRENT_WORKSPACE_STARTED = createAction(
  `${NAMESPACE}/FETCH_CURRENT_WORKSPACE_STARTED`
);
export const FETCH_CURRENT_WORKSPACE_COMPLETED = createAction<{ workspace: WorkspaceInDetails }>(
  `${NAMESPACE}/FETCH_CURRENT_WORKSPACE_COMPLETED`
);
export const FETCH_CURRENT_WORKSPACE_FAILED = createAction<string>(
  `${NAMESPACE}/FETCH_CURRENT_WORKSPACE_FAILED`
);

export const INVITE_USERS_TO_WORKSPACE = createAction<
  { slug: string; emails: string[] } | undefined,
  NamespaceType<typeof NAMESPACE, 'INVITE_USERS_TO_WORKSPACE'>
>(`${NAMESPACE}/INVITE_USERS_TO_WORKSPACE`);
export const INVITE_USERS_TO_WORKSPACE_STARTED = createAction(
  `${NAMESPACE}/INVITE_USERS_TO_WORKSPACE_STARTED`
);
export const INVITE_USERS_TO_WORKSPACE_COMPLETED = createAction(
  `${NAMESPACE}/INVITE_USERS_TO_WORKSPACE_COMPLETED`
);
export const INVITE_USERS_TO_WORKSPACE_FAILED = createAction<string>(
  `${NAMESPACE}/INVITE_USERS_TO_WORKSPACE_FAILED`
);

export const EXCLUDE_MEMBER_FROM_WORKSPACE = createAction<
  { slug: string; email: string } | undefined,
  NamespaceType<typeof NAMESPACE, 'EXCLUDE_MEMBER_FROM_WORKSPACE'>
>(`${NAMESPACE}/EXCLUDE_MEMBER_FROM_WORKSPACE`);
export const EXCLUDE_MEMBER_FROM_WORKSPACE_STARTED = createAction(
  `${NAMESPACE}/EXCLUDE_MEMBER_FROM_WORKSPACE_STARTED`
);
export const EXCLUDE_MEMBER_FROM_WORKSPACE_COMPLETED = createAction(
  `${NAMESPACE}/EXCLUDE_MEMBER_FROM_WORKSPACE_COMPLETED`
);
export const EXCLUDE_MEMBER_FROM_WORKSPACE_FAILED = createAction<string>(
  `${NAMESPACE}/EXCLUDE_MEMBER_FROM_WORKSPACE_FAILED`
);

export const CLEAR_CURRENT_WORKSPACE = createAction(`${NAMESPACE}/CLEAR_CURRENT_WORKSPACE`);
