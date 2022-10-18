import { HttpResponse } from './../types/common.type';

interface ErrorWrapper {
  statusCode: number;
}
export class NetworkError extends Error implements ErrorWrapper {
  statusCode: number = 500;

  constructor({ message, statusCode }: HttpResponse) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ClientError extends Error implements ErrorWrapper {
  statusCode: number = 400;

  constructor({ message, statusCode }: HttpResponse) {
    super(message);
    this.statusCode = statusCode;
  }
}
