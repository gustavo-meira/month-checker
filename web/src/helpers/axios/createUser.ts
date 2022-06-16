import { axiosRequest } from '.';

type User = {
  email: string;
  username: string;
  password: string;
};

export const createUser = async (user: User) => {
  const response = await axiosRequest('user', 'POST', user);
  return response?.status === 201;
};
