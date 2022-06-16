import { axiosRequest } from '.';

type ToCheck = {
  email?: string;
  username?: string;
}

export const userEmailExist = async (toCheck: ToCheck): Promise<boolean> => {
  const { email, username } = toCheck;
  try {
    if (email) {
      const response = await axiosRequest(`user/check?email=${email}`, 'POST');
      return response?.status === 200;
    }

    if (username) {
      const response = await axiosRequest(`user/check?username=${username}`, 'POST');
      return response?.status === 200;
    }

    return false;
  } catch (_err) {
    return false;
  }
};
