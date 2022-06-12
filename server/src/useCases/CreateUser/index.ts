import { UserRepository } from '../../repositories/prisma/UserRepository';
import { CreateUser } from './CreateUser';
import { CreateUserController } from './CreateUserController';

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const createUserController = new CreateUserController(createUser);

export { createUserController };
