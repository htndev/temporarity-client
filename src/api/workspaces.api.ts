import { Workspace } from '../common/types/workspace.type';
import { HttpResponse } from './../common/types/common.type';
import { WorkspaceInDetails } from './../common/types/workspace.type';
import { CREATE_WORKSPACE } from './../store/actions/workspaces';
import { BaseApi } from './base.api';

class WorkspacesApi extends BaseApi {
  constructor() {
    super('workspaces');
  }

  getMyWorkspaces = (): Promise<HttpResponse<{ workspaces: Workspace[] }>> =>
    this.instance.get('/');

  createWorkspace = (
    payload: ReturnType<typeof CREATE_WORKSPACE>['payload']['requestData']
  ): Promise<HttpResponse> => this.instance.post('/', payload);

  hasAccess = (slug: string): Promise<HttpResponse<{ hasAccess: boolean }>> =>
    this.instance.get(`/has-access/${slug}`);

  getWorkspace = (slug: string): Promise<HttpResponse<{ workspace: WorkspaceInDetails }>> =>
    this.instance.get(`/${slug}`);

  inviteUsersToWorkspace = (slug: string, emails: string[]): Promise<HttpResponse> =>
    this.instance.post(`/${slug}/invite`, { emails });

  excludeMemberFromWorkspace = (slug: string, email: string): Promise<HttpResponse> =>
    this.instance.delete(`/${slug}/exclude`, { data: { email } });
}

export const workspacesApi = new WorkspacesApi();
