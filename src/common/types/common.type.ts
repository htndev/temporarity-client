interface Response {
  statusCode: number;
  message?: string;
}

export type HttpResponse<T extends object = {}> = Response & T;

export type NamespaceType<Namespace extends string, T extends string> = `${Namespace}/${T}`;

export type PossibleArray<T> = T | T[];
