import { UserProps } from './UserProps';

export const getUser = (): UserProps | null => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
