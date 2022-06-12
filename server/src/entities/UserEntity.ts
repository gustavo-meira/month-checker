import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

type UserProps = {
  id?: string;
  username: string;
  email: string;
  password: {
    value: string;
    encrypted: boolean;
  }
}

export class UserEntity {
  readonly id: string;

  private _username: string;

  private _email: string;

  private _password: string;

  constructor(props: UserProps) {
    const {
      id, username, email, password,
    } = props;

    this._username = username;
    this._email = email;

    if (password.encrypted) {
      this._password = password.value;
    } else {
      this._password = bcrypt.hashSync(password.value);
    }

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
