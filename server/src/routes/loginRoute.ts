import {
  NextFunction, Request, Response, Router,
} from 'express';
import { loginUserController } from '../useCases/LoginUser';

const loginRoute = Router();

loginRoute.post('/', (req: Request, res: Response, next: NextFunction) => {
  loginUserController.handle(req, res, next);
});

export { loginRoute };
