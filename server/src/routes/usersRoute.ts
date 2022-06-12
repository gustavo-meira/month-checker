import {
  NextFunction, Request, Response, Router,
} from 'express';
import { createUserController } from '../useCases/CreateUser';

const usersRouter = Router();

usersRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  createUserController.handle(req, res, next);
});

export { usersRouter };
