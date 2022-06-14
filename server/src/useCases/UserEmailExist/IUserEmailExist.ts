export type ToCheck = {
  email?: string;
  username?: string;
}

/* eslint no-unused-vars: "off" */
export interface IUserEmailExist {
  execute(toCheck: ToCheck): Promise<boolean>;
}
