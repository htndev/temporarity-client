import { Authorization } from './../common/types/routes.type';
import { HttpResponse } from '../common/types/common.type';
import { CreateRouteRequest, Route, RouteDetails } from '../common/types/routes.type';
import { containsFile } from '../common/utils/api';
import { BaseApi } from './base.api';

class RoutesApi extends BaseApi {
  constructor() {
    super('workspace-routes');
  }

  getRoutes = (slug: string): Promise<HttpResponse<{ routes: Route[] }>> =>
    this.instance.get(`/${slug}`);

  createRoute = (slug: string, route: CreateRouteRequest): Promise<HttpResponse> => {
    const body = this.prepareData(route);

    return this.instance.post(`/${slug}`, body, {
      headers: {
        'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json'
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

  updateRouteResponse = (
    slug: string,
    routeId: string,
    response: Pick<RouteDetails, 'response' | 'responseType'>
  ): Promise<HttpResponse> => {
    const body = this.prepareData(response);

    return this.instance.patch(`/${slug}/update/${routeId}/response`, body);
  };

  updateRouteAuthorization = (
    slug: string,
    routeId: string,
    authorization: Authorization
  ): Promise<HttpResponse> =>
    this.instance.patch(`/${slug}/update/${routeId}/authorization`, authorization);

  deleteRoute = (slug: string, routeId: string): Promise<HttpResponse> =>
    this.instance.delete(`/${slug}/${routeId}`);

  private prepareData = (payload: any): object | FormData => {
    let data: any;

    if (containsFile(payload)) {
      data = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((value: any) => data.append(`${key}[]`, value));
        } else if (typeof value === 'object' && !(value instanceof File)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
    } else {
      data = payload;
    }

    return data;
  };
}

export const routesApi = new RoutesApi();
