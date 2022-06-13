import { BadRequestError } from '../errors/BadRequestError';

const validateUsername = (username: string) => {
  if (username === undefined || username === '') {
    throw new BadRequestError('"username" is required');
  }
  if (username.length < 3) {
    throw new BadRequestError('"username" must be at least 3 characters long');
  }
  if (username.length > 20) {
    throw new BadRequestError('"username" must be at most 20 characters long');
  }
};

export { validateUsername };
