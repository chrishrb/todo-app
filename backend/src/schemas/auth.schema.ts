import { IsEmail, IsNotEmpty } from "class-validator";
import { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../exceptions/errors/login-error";

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

export class AuthLoginSchema {
  token_type: string = "Bearer";
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}

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
