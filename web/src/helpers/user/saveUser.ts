import { UserProps } from './UserProps';

export const saveUser = (user: UserProps) => {
  const {
    id, username, email, token,
  } = user;
  localStorage.setItem('user', JSON.stringify({
    id, username, email, token,
  }));
};
