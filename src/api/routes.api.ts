import { HttpResponse } from '../common/types/common.type';
import { CreateRouteRequest, Route, RouteDetails } from './../common/types/routes.type';
import { containsFile } from './../common/utils/api';
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

  getRouteDetails = (slug: string, routeId: string): Promise<HttpResponse<RouteDetails>> =>
    this.instance.get(`/${slug}/details/${routeId}`);

  updateRouteMethods = (slug: string, routeId: string, methods: string[]): Promise<HttpResponse> =>
    this.instance.patch(`/${slug}/update/${routeId}/methods`, { methods });

  updateRouteStatus = (slug: string, routeId: string, status: number): Promise<HttpResponse> =>
    this.instance.patch(`/${slug}/update/${routeId}/status`, { status });

  updateRoutePath = (slug: string, routeId: string, path: string): Promise<HttpResponse> =>
    this.instance.patch(`/${slug}/update/${routeId}/path`, { path });
}

export const routesApi = new RoutesApi();
