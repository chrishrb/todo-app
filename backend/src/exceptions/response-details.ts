export class ResponseError {
  // Validation
  static readonly INVALID_EMAIL = new ResponseError(4001, 'Invalid email')
  static readonly INVALID_PASSWORD = new ResponseError(4002, 'Invalid email')
  static readonly INVALID_FIRST_NAME = new ResponseError(4003, 'Invalid firstName')
  static readonly INVALID_LAST_NAME = new ResponseError(4004, 'Invalid lastName')

  // Duplicate resource
  static readonly USER_EXISTS = new ResponseError(4107, 'Email already registered')

  // Login
  static readonly WRONG_EMAIL = new ResponseError(4200, 'Wrong email')
  static readonly WRONG_PASSWORD = new ResponseError(4201, 'Wrong password')
  static readonly USER_NOT_FOUND = new ResponseError(4202, 'User not found.')

  // Token
  static readonly ACCESS_TOKEN = new ResponseError(4300, 'No access token or not valid anymore.')
  static readonly REFRESH_TOKEN = new ResponseError(4301, 'No refresh token or not valid anymore.')


  private constructor(public readonly errorCode: number, public readonly errorMessage: any) {}

  toString() {
    return `errorCode: ${this.errorCode}, errorMessage: ${this.errorMessage}` ;
  }
}

