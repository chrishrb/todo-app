import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

class UserSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  constructor(email: string, firstName: string, lastName: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class CreateUserSchema extends UserSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string, firstName: string, lastName: string) {
    super(email, firstName, lastName);
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

  constructor(email: string, password: string, firstName: string, lastName: string) {
    super(email, firstName, lastName);
    this.password = password;
  }
}

export class ReadUserSchema extends UserSchema {
  @IsNumber()
  id: string;

  constructor(id: string, email: string, firstName: string, lastName: string) {
    super(email, firstName, lastName);
    this.id = id;
  }
}
