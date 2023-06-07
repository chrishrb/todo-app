import { IsEmail, IsNotEmpty } from "class-validator";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../exceptions/errors/login-error";
import { ResponseError } from "../exceptions/response-details";

/**
 * LoginSchema
 *
 * @typedef {object} LoginSchema
 * @property {string} email.required - Email
 * @property {string} password - Password
 */
export class LoginSchema {
  @IsEmail(undefined, {
    context: {
      errorCode: ResponseError.INVALID_EMAIL.errorCode,
      errorMessage: ResponseError.INVALID_EMAIL.errorMessage
    }
  })
  email: string;

  @IsNotEmpty({
    context: {
      errorCode: ResponseError.INVALID_PASSWORD.errorCode,
      errorMessage: ResponseError.INVALID_PASSWORD.errorMessage
    }
  })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
/**
 * TokenSchema
 */
export class TokenSchema {
  accessToken: string;
  refreshToken: string

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
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

export enum JwtType {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken"
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
  type: JwtType;
  userId: string;
  isAdmin: boolean;

  constructor(type: JwtType, userId: string, isAdmin: boolean) {
    this.type = type
    this.userId = userId;
    this.isAdmin = isAdmin;
  }

  toPlainObj(): { type: string, userId: string, isAdmin: boolean } {
    return Object.assign({}, this);
  }

  static fromPlainObj(type: JwtType, obj: string | JwtPayload) {
    if (typeof obj == 'string') {
      throw new UnauthorizedError([{
        field: 'token', 
        replyCode: ResponseError.ACCESS_TOKEN.errorCode,
        replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
      }]);
    }
    if (obj.type == null || obj.type !== type) {
      throw new UnauthorizedError([{
        field: 'token', 
        replyCode: ResponseError.ACCESS_TOKEN.errorCode,
        replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
      }]);
    }
    if (obj.userId == null || obj.isAdmin == null) {
      throw new UnauthorizedError([{
        field: 'token', 
        replyCode: ResponseError.ACCESS_TOKEN.errorCode,
        replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
      }]);
    }
    return new JwtPayloadSchema(obj.type as JwtType, obj.userId, obj.isAdmin);
  }
}
