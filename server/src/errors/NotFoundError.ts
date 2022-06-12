import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  public readonly statusCode: number = 404;
}
