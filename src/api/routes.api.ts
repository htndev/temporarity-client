import { containsFile } from './../common/utils/api';
import { Route, CreateRouteRequest } from './../common/types/routes.type';
import { HttpResponse } from '../common/types/common.type';
import { BaseApi } from './base.api';

class RoutesApi extends BaseApi {
  constructor() {
    super('workspace-routes');
  }

  getRoutes = (slug: string): Promise<HttpResponse<{ routes: Route[] }>> =>
    this.instance.get(`/${slug}`);

  createRoute = (slug: string, route: CreateRouteRequest): Promise<HttpResponse> => {
    let data: any;
    if (containsFile(route)) {
      data = new FormData();
      Object.entries(route).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((value: any) => data.append(`${key}[]`, value));
        } else if (typeof value === 'object' && !(value instanceof File)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
    } else {
      data = route;
    }

    return this.instance.post(`/${slug}`, data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    });
  };
}

export const routesApi = new RoutesApi();
