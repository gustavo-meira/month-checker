import { NextFunction, Request, Response } from 'express';
import { ICreateUser } from './ICreateUser';

export class CreateUserController {
  private createUser: ICreateUser;

  constructor(createUser: ICreateUser) {
    this.createUser = createUser;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, password } = req.body;
      await this.createUser.execute({ email, username, password });
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}
