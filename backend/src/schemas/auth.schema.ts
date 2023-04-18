import { IsEmail, IsNotEmpty } from "class-validator";
import { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../exceptions/errors/login-error";

/**
 * LoginSchema
 *
 * @typedef {object} LoginSchema
 * @property {string} email.required - Email
 * @property {string} password - Password
 */
export class LoginSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

/**
 * AuthLoginSchema
 *
 * @typedef {object} AuthLoginSchema
 * @property {string} tokenType - Type of token
 * @property {string} accessToken - Access token
 */
export class AuthLoginSchema {
  tokenType: string = "Bearer";
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}

/**
 * JwtPayloadSchema
 *
 * @typedef {object} JwtPayloadSchema
 * @property {string} userId - UserId
 * @property {string} email - Email
 * @property {boolean} isAdmin - IsAdmin
 */
export class JwtPayloadSchema {
  userId: string;
  email: string;
  isAdmin: boolean;

  constructor(userId: string, email: string, isAdmin: boolean) {
    this.userId = userId;
    this.email = email;
    this.isAdmin = isAdmin;
  }

  toPlainObj(): { userId: string, email: string } {
    return Object.assign({}, this);
  }

  static fromPlainObj(obj: string | JwtPayload) {
    if (typeof obj == 'string') {
      throw new ForbiddenError();
    }
    if (obj.email == null || obj.userId == null || obj.isAdmin == null) {
      throw new ForbiddenError();
    }
    return new JwtPayloadSchema(obj.userId, obj.email, obj.isAdmin);
  }
}
