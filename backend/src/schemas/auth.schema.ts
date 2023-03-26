import { IsEmail, IsNotEmpty } from "class-validator";

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

export class JwtVerifySchema {
  @IsNotEmpty()
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}
