import { PossibleArray } from '../common/types/common.type';
import { BASE_URL } from './../common/constants/api.constant';
import { HttpResponse } from './../common/types/common.type';
import { NetworkError } from './../common/utils/errors';

enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  HEAD = 'head',
  OPTIONS = 'options'
}

type QueryTypes = PossibleArray<string | number | boolean>;
type QueryContent = Record<string, QueryTypes>;

type PossibleContentType = QueryTypes | PossibleArray<File | Blob>;
type BodyContent = Record<string, PossibleContentType | Record<string, PossibleContentType>>;

interface BaseRequest {
  responseType?: 'json' | 'text' | 'blob';
  headers?: Record<string, string>;
  method: HttpMethod;
}

interface FetchQueryOptions extends BaseRequest {
  query?: string;
}

interface FetchBodyOptions extends BaseRequest {
  body?: FormData | Blob | string;
}

type QueryType = Omit<BaseRequest, 'method'> & { query?: QueryContent };
type BodyType = Omit<BaseRequest, 'method'> & { body?: BodyContent };

const isQueryRequest = (v: FetchQueryOptions): v is FetchQueryOptions => v.query !== undefined;
const isBodyRequest = (v: FetchBodyOptions): v is FetchBodyOptions => v.body !== undefined;
const doesArrayIncludesFiles = (values: any[]): boolean =>
  values.some((v) => v instanceof File || v instanceof Blob);

export class BaseApi {
  url = BASE_URL;

  constructor(path: string) {
    this.url += `/${path}`;
  }

  async fetch<T extends HttpResponse = any>(
    path: string,
    data: FetchQueryOptions | FetchBodyOptions
  ): Promise<T> {
    let url = `${this.url}${path}`;

    const opts: RequestInit & { headers: HeadersInit } = {
      method: data.method,
      headers: data.headers || {}
    };

    if (isQueryRequest(data)) {
      url += `?${data.query}`;
    } else if (isBodyRequest(data)) {
      opts.body = data.body;
      if (!doesArrayIncludesFiles(Object.values(data.body as any))) {
        (opts.headers as any)['Content-Type'] = 'application/json';
      }
    }

    const response = await fetch(url, opts);
    const method = data?.responseType && response[data.responseType] ? data?.responseType : 'json';
    const result: T = await response[method]();

    if (result.statusCode >= 400) {
      throw new NetworkError(result);
    }

    return result;
  }

  get<T extends HttpResponse = any>(path: string): Promise<T>;
  get<T extends HttpResponse = any>(path: string, data: QueryType): Promise<T>;
  get<T extends HttpResponse = any>(path: string, data?: QueryType): Promise<T> {
    return this.fetch<T>(path, { ...this.prepareQueryRequest(data), method: HttpMethod.GET });
  }

  post<T extends HttpResponse = any>(path: string): Promise<T>;
  post<T extends HttpResponse = any>(path: string, data: BodyType): Promise<T>;
  post<T extends HttpResponse = any>(path: string, data?: BodyType) {
    return this.fetch<T>(path, { ...this.prepareBodyRequest(data), method: HttpMethod.POST });
  }

  put<T extends HttpResponse = any>(path: string): Promise<T>;
  put<T extends HttpResponse = any>(path: string, data: BodyType): Promise<T>;
  put<T extends HttpResponse = any>(path: string, data?: BodyType): Promise<T> {
    return this.fetch<T>(path, { ...this.prepareBodyRequest(data), method: HttpMethod.PUT });
  }

  head<T extends HttpResponse = any>(path: string): Promise<T>;
  head<T extends HttpResponse = any>(path: string, data: QueryType): Promise<T>;
  head<T extends HttpResponse = any>(path: string, data?: QueryType): Promise<T> {
    return this.fetch<T>(path, { ...this.prepareQueryRequest(data), method: HttpMethod.HEAD });
  }

  delete<T extends HttpResponse = any>(path: string): Promise<T>;
  delete<T extends HttpResponse = any>(path: string, data: BodyType): Promise<T>;
  delete<T extends HttpResponse = any>(path: string, data?: BodyType): Promise<T> {
    return this.fetch<T>(path, { ...this.prepareBodyRequest(data), method: HttpMethod.DELETE });
  }

  patch<T extends HttpResponse = any>(path: string): Promise<T>;
  patch<T extends HttpResponse = any>(path: string, data: BodyType): Promise<T>;
  patch<T extends HttpResponse = any>(path: string, data?: BodyType): Promise<T> {
    return this.fetch<T>(path, { ...this.prepareBodyRequest(data), method: HttpMethod.PATCH });
  }

  options<T extends HttpResponse = any>(path: string): Promise<T>;
  options<T extends HttpResponse = any>(path: string, data: QueryType): Promise<T>;
  options<T extends HttpResponse = any>(path: string, data?: QueryType): Promise<T> {
    return this.fetch<T>(path, { ...this.prepareQueryRequest(data), method: HttpMethod.OPTIONS });
  }

  private prepareQueryRequest(data?: QueryType): FetchQueryOptions {
    const query = data?.query ? this.parseQuery(data.query) : undefined;
    const options = { ...data } as FetchQueryOptions;

    if (query) {
      options.query = query;
    }

    return options;
  }

  private prepareBodyRequest(data?: BodyType): FetchBodyOptions {
    const body = data?.body ? this.parseBody(data.body) : undefined;
    const options = { ...data } as FetchBodyOptions;

    if (body) {
      options.body = body;
    }

    return options;
  }

  private parseBody(body: BodyContent): FormData | string {
    const keys = Object.keys(body);
    if (keys.length === 0) {
      return JSON.stringify({});
    }

    const values = Object.values(body);

    if (doesArrayIncludesFiles(values)) {
      const fd = new FormData();
      keys.forEach((key) => fd.append(key, body[key] as any));
      return fd;
    }

    return JSON.stringify(body);
  }

  private parseQuery(query: QueryContent): string {
    return new URLSearchParams(query as any).toString();
  }
}
