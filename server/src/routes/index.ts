import { Router } from 'express';
import { usersRouter } from './usersRoute';

const router = Router();

router.use('/user', usersRouter);

export { router };
