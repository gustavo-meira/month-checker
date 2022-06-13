import {
  NextFunction, Request, Response, Router,
} from 'express';
import { validateCreateUser } from '../middlewares/validateCreateUser';
import { createUserController } from '../useCases/CreateUser';

const usersRouter = Router();

usersRouter.post('/', validateCreateUser, (req: Request, res: Response, next: NextFunction) => {
  createUserController.handle(req, res, next);
});

export { usersRouter };
