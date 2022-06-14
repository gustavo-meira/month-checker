import { UserRepository } from '../../repositories/prisma/UserRepository';
import { LoginUser } from './LoginUser';
import { LoginUserController } from './LoginUserController';

const userRepository = new UserRepository();
const loginUser = new LoginUser(userRepository);
const loginUserController = new LoginUserController(loginUser);

export { loginUserController };
