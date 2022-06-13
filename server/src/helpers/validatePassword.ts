import { BadRequestError } from '../errors/BadRequestError';

const validatePassword = (password: string) => {
  if (password === undefined || password === '') {
    throw new BadRequestError('"password" is required');
  }
  if (password.length < 8) {
    throw new BadRequestError('"password" must be at least 8 characters long');
  }
  if (password.length > 20) {
    throw new BadRequestError('"password" must be at most 20 characters long');
  }
};

export { validatePassword };
