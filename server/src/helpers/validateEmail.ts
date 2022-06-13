import { BadRequestError } from '../errors/BadRequestError';

const validateEmail = (email: string) => {
  if (email === undefined || email === '') {
    throw new BadRequestError('"email" is required');
  }
  const [prefix, domain] = email.split('@');
  if (prefix === undefined || prefix === '') {
    throw new BadRequestError('"email" must have a prefix');
  }
  if (domain === undefined || domain === '') {
    throw new BadRequestError('"email" must have a domain');
  }
  if (!domain.includes('.com')) {
    throw new BadRequestError('"email" must be a valid email address');
  }
};

export { validateEmail };
