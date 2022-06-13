import { NextFunction, Request, Response } from 'express';
import { validateEmail } from '../helpers/validateEmail';
import { validatePassword } from '../helpers/validatePassword';
import { validateUsername } from '../helpers/validateUsername';

const validateCreateUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    next();
  } catch (err) {
    next(err);
  }
};

export { validateCreateUser };
