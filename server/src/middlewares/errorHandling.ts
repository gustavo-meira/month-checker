import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

export const errorHandling = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
};
