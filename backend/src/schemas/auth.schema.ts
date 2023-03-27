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
  userId: number;
  email: string;

  constructor(userId: number, email: string) {
    this.userId = userId;
    this.email = email;
  }

  toPlainObj(): { userId: number, email: string } {
    return Object.assign({}, this);
  }

  static fromPlainObj(obj: string | JwtPayload) {
    if (typeof obj == 'string') {
      throw new ForbiddenError();
    }
    if (obj.email == null || obj.userId == null) {
      throw new ForbiddenError();
    }
    return new JwtPayloadSchema(obj.userId, obj.email);
  }
}
