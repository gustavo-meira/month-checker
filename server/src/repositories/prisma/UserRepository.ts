import bcrypt from 'bcryptjs';
import { prisma } from '.';
import { UserEntity } from '../../entities/UserEntity';
import { NotFoundError } from '../../errors/NotFoundError';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private prisma = prisma;

  async create(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundError('User not found');

    const userFounded = new UserEntity({
      id: user.id,
      username: user.username,
      email: user.email,
      password: {
        encrypted: true,
        value: user.password,
      },
    });

    return userFounded;
  }

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new NotFoundError('User not found');

    const userFounded = new UserEntity({
      id: user.id,
      username: user.username,
      email: user.email,
      password: {
        encrypted: true,
        value: user.password,
      },
    });

    return userFounded;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundError('User not found');

    const userFounded = new UserEntity({
      id: user.id,
      username: user.username,
      email: user.email,
      password: {
        encrypted: true,
        value: user.password,
      },
    });

    return userFounded;
  }

  /* eslint class-methods-use-this: "off" */
  async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, user.password);

    return isValid;
  }
}
