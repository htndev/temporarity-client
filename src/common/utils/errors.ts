import { HttpResponse } from './../types/common.type';

export class NetworkError extends Error {
  statusCode: number = -1;

  constructor({ message, statusCode }: HttpResponse) {
    super(message);
    this.statusCode = statusCode;
  }
}
