import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ReadUserSchema {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }
}
