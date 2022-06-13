import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  public readonly statusCode: number = 400;
}
