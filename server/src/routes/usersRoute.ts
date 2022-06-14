import {
  NextFunction, Request, Response, Router,
} from 'express';
import { validateCreateUser } from '../middlewares/validateCreateUser';
import { createUserController } from '../useCases/CreateUser';
import { userEmailExistController } from '../useCases/UserEmailExist';

const usersRouter = Router();

usersRouter.post('/', validateCreateUser, (req: Request, res: Response, next: NextFunction) => {
  createUserController.handle(req, res, next);
});

usersRouter.post('/check', (req: Request, res: Response, next: NextFunction) => {
  userEmailExistController.handle(req, res, next);
});

export { usersRouter };
