import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ResponseError } from "../exceptions/response-details";

class UserSchema {
  @IsEmail(undefined, {
    context: {
      errorCode: ResponseError.INVALID_EMAIL.errorCode,
      errorMessage: ResponseError.INVALID_EMAIL.errorMessage
    }
  })
  email: string;

  @IsNotEmpty({
    context: {
      errorCode: ResponseError.INVALID_FIRST_NAME.errorCode,
      errorMessage: ResponseError.INVALID_FIRST_NAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.INVALID_FIRST_NAME.errorCode,
      errorMessage: ResponseError.INVALID_FIRST_NAME.errorMessage
    }
  })
  firstName: string;

  @IsNotEmpty({
    context: {
      errorCode: ResponseError.INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.INVALID_LAST_NAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.INVALID_LAST_NAME.errorMessage
    }
  })
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
  @IsNotEmpty({
    context: {
      errorCode: ResponseError.INVALID_PASSWORD.errorCode,
      errorMessage: ResponseError.INVALID_PASSWORD.errorMessage
    }
  })
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
  @IsEmail(undefined, {
    context: {
      errorCode: ResponseError.INVALID_EMAIL.errorCode,
      errorMessage: ResponseError.INVALID_EMAIL.errorMessage
    }
  })
  email: string;

  @IsOptional()
  @IsNotEmpty({
    context: {
      errorCode: ResponseError.INVALID_PASSWORD.errorCode,
      errorMessage: ResponseError.INVALID_PASSWORD.errorMessage
    }
  })
  password: string;

  @IsOptional()
  @IsString({
    context: {
      errorCode: ResponseError.INVALID_FIRST_NAME.errorCode,
      errorMessage: ResponseError.INVALID_FIRST_NAME.errorMessage
    }
  })
  firstName: string;

  @IsOptional()
  @IsString({
    context: {
      errorCode: ResponseError.INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.INVALID_LAST_NAME.errorMessage
    }
  })
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
