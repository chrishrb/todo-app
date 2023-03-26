import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

class UserSchema {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class CreateUserSchema extends UserSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    super(email)
    this.password = password;
  }
}

export class UpdateUserSchema extends UserSchema {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    super(email)
    this.password = password;
  }
}

export class ReadUserSchema extends UserSchema {
  @IsNumber()
  id: number;

  constructor(id: number, email: string) {
    super(email)
    this.id = id;
  }
}
