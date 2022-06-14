import { BadRequestError } from '../../errors/BadRequestError';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserEmailExist, ToCheck } from './IUserEmailExist';

export class UserEmailExist implements IUserEmailExist {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(toCheck: ToCheck): Promise<boolean> {
    const { email, username } = toCheck;
    try {
      if (email) {
        await this.userRepository.getByEmail(email);
      }

      if (username) {
        await this.userRepository.getByUsername(username);
      }

      if (!email && !username) {
        throw new BadRequestError('"username" or "email" is required');
      }

      return false;
    } catch (err: unknown) {
      if (err instanceof BadRequestError) throw err;
      return true;
    }
  }
}
