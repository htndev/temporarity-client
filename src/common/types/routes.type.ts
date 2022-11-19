import { PossibleArray } from './common.type';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ALL = 'ALL'
}

export interface Route {
  id: string;
  path: string;
  methods: HttpMethod[];
  status: number;
}

export type ResponseType = null | object | string;

export interface RouteDetails {
  responseType: WorkspaceRouteResponseType;
  response: null | object | string;
}

export enum WorkspaceRouteResponseType {
  Schema = 'schema',
  File = 'file',
  RandomImage = 'random-image'
}

export interface CreateRouteRequest extends Omit<Route, 'id'> {
  responseType: WorkspaceRouteResponseType;
  response: PossibleArray<Record<string, unknown>> | File | null;
}
