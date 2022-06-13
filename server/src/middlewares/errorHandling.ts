import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

export const errorHandling = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
};
