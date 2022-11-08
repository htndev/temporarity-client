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
  path: string;
  methods: HttpMethod[];
  status: number;
}

export enum WorkspaceRouteResponseType {
  Schema = 'schema',
  File = 'file',
  RandomImage = 'random-image'
}

export interface CreateRouteRequest extends Route {
  responseType: WorkspaceRouteResponseType;
  response: PossibleArray<Record<string, unknown>> | File | null;
}
