import { Router } from 'express';
import { errorHandling } from '../middlewares/errorHandling';
import { usersRouter } from './usersRoute';

const router = Router();

router.use('/user', usersRouter);

router.use(errorHandling);

export { router };
