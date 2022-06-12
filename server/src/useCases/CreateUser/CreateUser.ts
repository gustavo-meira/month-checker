import { UserEntity } from '../../entities/UserEntity';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUser, UserProps } from './ICreateUser';

export class CreateUser implements ICreateUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: UserProps): Promise<void> {
    const userEntity = new UserEntity({
      ...user,
      password: { encrypted: false, value: user.password },
    });
    await this.userRepository.create(userEntity);
  }
}
