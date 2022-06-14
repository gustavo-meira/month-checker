import { NextFunction, Request, Response } from 'express';
import { IUserEmailExist } from './IUserEmailExist';

export class UserEmailExistController {
  private checkUser: IUserEmailExist;

  constructor(checkUser: IUserEmailExist) {
    this.checkUser = checkUser;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userAlreadyExist = await this.checkUser.execute(req.query);

      if (userAlreadyExist) {
        res.status(409).send();
      } else {
        res.status(200).send();
      }
    } catch (err) {
      next(err);
    }
  }
}
