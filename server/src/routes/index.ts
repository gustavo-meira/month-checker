import { Router } from 'express';
import { errorHandling } from '../middlewares/errorHandling';
import { loginRoute } from './loginRoute';
import { usersRouter } from './usersRoute';

const router = Router();

router.use('/user', usersRouter);
router.use('/login', loginRoute);

router.use(errorHandling);

export { router };
