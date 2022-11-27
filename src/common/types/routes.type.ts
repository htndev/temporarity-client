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

export enum RouteAuthorizationStrategy {
  NONE = 'none',
  JWT = 'jwt',
  API_KEY = 'api-key'
}

export interface Route {
  id: string;
  path: string;
  methods: HttpMethod[];
  status: number;
}

export type ResponseType = null | object | string;

export enum Condition {
  BePresented = 'be-presented',
  NotExpired = 'not-expired',
  BeValid = 'be-valid',
  Equals = 'equals'
}

export interface BePresentedConfig {
  condition: Condition.BePresented;
  payload: null;
}

export interface NotExpiredConfig {
  condition: Condition.NotExpired;
  payload: null;
}

export interface BeValidConfig {
  condition: Condition.BeValid;
  payload: { signature: string };
}

export interface EqualsConfig {
  condition: Condition.Equals;
  payload: { value: string };
}

export type JwtStrategyConfig = BePresentedConfig | NotExpiredConfig | BeValidConfig | EqualsConfig;

export interface ApiKeyConfig {
  apiKeyQueryParam: string;
  apiKey: string;
}

export type AuthorizationPayload = null | JwtStrategyConfig | ApiKeyConfig;

export interface Authorization {
  strategy: RouteAuthorizationStrategy;
  payload: AuthorizationPayload;
}

export interface RouteDetails {
  responseType: WorkspaceRouteResponseType;
  response: null | object | string;
  authorization: Authorization;
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
