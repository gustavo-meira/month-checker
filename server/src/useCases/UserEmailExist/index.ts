import { UserRepository } from '../../repositories/prisma/UserRepository';
import { UserEmailExist } from './UserEmailExist';
import { UserEmailExistController } from './UserEmailExistController';

const userRepository = new UserRepository();
const userEmailExist = new UserEmailExist(userRepository);
const userEmailExistController = new UserEmailExistController(userEmailExist);

export { userEmailExistController };
