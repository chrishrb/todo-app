import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

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

/**
 * CreateUserSchema
 *
 * @typedef {object} CreateUserSchema
 * @property {string} email.required - Email
 * @property {string} firstName.required - First Name
 * @property {string} lastName.required - Last Name
 * @property {string} password.required - Pasword
 */
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

/**
 * UpdateUserSchema
 *
 * @typedef {object} UpdateUserSchema
 * @property {string} email.required - Email
 * @property {string} firstName - First Name
 * @property {string} lastName - Last Name
 * @property {string} password - Password
 */
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

/**
 * ReadUserSchema
 *
 * @typedef {object} ReadUserSchema
 * @property {string} id - Id
 * @property {string} email - Email
 * @property {string} firstName - First Name
 * @property {string} lastName - Last Name
 */
export class ReadUserSchema extends UserSchema {
  @IsUUID()
  id: string;

  constructor(id: string, email: string, firstName: string, lastName: string) {
    super(email, firstName, lastName);
    this.id = id;
  }
}
