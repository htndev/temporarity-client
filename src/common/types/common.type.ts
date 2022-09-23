export interface HttpResponse {
  statusCode: number;
  message: string;
}

export type PossibleArray<T> = T | T[];
