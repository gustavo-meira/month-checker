import { UserEntity } from '../entities/UserEntity';

/* eslint no-unused-vars: "off" */
export interface IUserRepository {
  create(user: UserEntity): Promise<void>;
  getByEmail(email: string): Promise<UserEntity>;
  getByUsername(username: string): Promise<UserEntity>;
  validatePassword(user: UserEntity, password: string): Promise<boolean>;
}
