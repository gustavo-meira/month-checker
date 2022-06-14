/* eslint no-unused-vars: "off" */
export interface ILoginUser {
  execute(email: string, password: string): Promise<string>;
}
