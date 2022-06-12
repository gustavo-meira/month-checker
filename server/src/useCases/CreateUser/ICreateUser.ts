export type UserProps = {
  username: string;
  email: string;
  password: string;
}

/* eslint no-unused-vars: "off" */
export interface ICreateUser {
  execute(user: UserProps): Promise<void>;
}
