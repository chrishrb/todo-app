import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ReadUserSchema {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
