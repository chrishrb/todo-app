import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ResponseError } from "../exceptions/response-details";
import { Language } from '@prisma/client';

class UserSchema {
  @IsEmail(undefined, {
    context: {
      errorCode: ResponseError.USER_INVALID_EMAIL.errorCode,
      errorMessage: ResponseError.USER_INVALID_EMAIL.errorMessage
    }
  })
  email: string;

  @IsNotEmpty({
    context: {
      errorCode: ResponseError.USER_INVALID_FIRST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_FIRST_NAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.USER_INVALID_FIRST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_FIRST_NAME.errorMessage
    }
  })
  firstName: string;

  @IsNotEmpty({
    context: {
      errorCode: ResponseError.USER_INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_LAST_NAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.USER_INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_LAST_NAME.errorMessage
    }
  })
  lastName: string;

  @IsOptional()
  @IsEnum(Language, {
    context: {
      errorCode: ResponseError.USER_INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_LAST_NAME.errorMessage
    }
  })
  language: Language | null;

  constructor(email: string, firstName: string, lastName: string, language: Language | null) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.language = language;
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
      errorCode: ResponseError.USER_INVALID_PASSWORD.errorCode,
      errorMessage: ResponseError.USER_INVALID_PASSWORD.errorMessage
    }
  })
  password: string;

  constructor(email: string, password: string, firstName: string, lastName: string, language: Language | null) {
    super(email, firstName, lastName, language);
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
      errorCode: ResponseError.USER_INVALID_EMAIL.errorCode,
      errorMessage: ResponseError.USER_INVALID_EMAIL.errorMessage
    }
  })
  email: string | null;

  @IsOptional()
  @IsString({
    context: {
      errorCode: ResponseError.USER_INVALID_PASSWORD.errorCode,
      errorMessage: ResponseError.USER_INVALID_PASSWORD.errorMessage
    }
  })
  password: string | null;

  @IsOptional()
  @IsString({
    context: {
      errorCode: ResponseError.USER_INVALID_FIRST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_FIRST_NAME.errorMessage
    }
  })
  firstName: string | null;

  @IsOptional()
  @IsString({
    context: {
      errorCode: ResponseError.USER_INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_LAST_NAME.errorMessage
    }
  })
  lastName: string | null;

  @IsOptional()
  @IsEnum(Language, {
    context: {
      errorCode: ResponseError.USER_INVALID_LAST_NAME.errorCode,
      errorMessage: ResponseError.USER_INVALID_LAST_NAME.errorMessage
    }
  })
  language: Language | null;

  constructor(email: string | null, password: string | null, firstName: string | null, lastName: string | null, language: Language | null) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.language  = language;
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
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    isAdmin: boolean, 
    language: Language | null,
    createdAt: string, 
    updatedAt: string
  ) {
    super(email, firstName, lastName, language);
    this.id = id;
    this.isAdmin = isAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
