import { BadRequestError } from '../../errors/BadRequestError';
import { JWT } from '../../helpers/JWT';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginUser } from './ILoginUser';

export class LoginUser implements ILoginUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<string> {
    try {
      const user = await this.userRepository.getByEmail(email);
      const isValidPassword = await this.userRepository.validatePassword(user, password);
      if (!isValidPassword) {
        throw new BadRequestError('email or password is invalid');
      }
      const token = await JWT.generateToken({ id: user.id });
      return token;
    } catch (err) {
      throw new BadRequestError('"email" or "password" is invalid');
    }
  }
}
