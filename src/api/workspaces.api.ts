import { HttpResponse } from './../common/types/common.type';
import { Workspace } from '../common/types/workspace.type';
import { BaseApi } from './base.api';

class WorkspacesApi extends BaseApi {
  constructor() {
    super('workspaces');
  }

  getMyWorkspaces(
    args: Parameters<this['get']>[1]
  ): Promise<HttpResponse<{ workspaces: Workspace[] }>> {
    return this.get('/', args);
  }

  createWorkspace(args: Parameters<this['get']>[1]): Promise<HttpResponse> {
    return this.post('/', args);
  }

  hasAccess(
    slug: string,
    args: Parameters<this['get']>[1]
  ): Promise<HttpResponse<{ hasAccess: boolean }>> {
    return this.get(`/has-access/${slug}`, args);
  }
}

export const workspacesApi = new WorkspacesApi();
