import { axiosRequest } from '.';
import { UserProps } from '../user/UserProps';

type LoginProps = {
  email: string;
  password: string;
}

export const loginUser = async (login: LoginProps): Promise<UserProps | null> => {
  const response = await axiosRequest('login', 'POST', login);
  if (response?.status === 200) {
    return response.data;
  }
  return null;
};
