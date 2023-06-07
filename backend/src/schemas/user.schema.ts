import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UserSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
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
 * @property {string} email - Email
 * @property {string} firstName - First Name
 * @property {string} lastName - Last Name
 * @property {string} password - Password
 */
export class UpdateUserSchema {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  constructor(email: string, password: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
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
 * @property {boolean} isAdmin - IsAdmin
 */
export class ReadUserSchema extends UserSchema {
  id: string;
  isAdmin: boolean;

  constructor(id: string, email: string, firstName: string, lastName: string, isAdmin: boolean) {
    super(email, firstName, lastName);
    this.id = id;
    this.isAdmin = isAdmin;
  }
}
