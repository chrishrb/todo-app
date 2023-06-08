export class ResponseError {
  // User-Validation
  static readonly USER_INVALID_EMAIL = new ResponseError(4001, 'Invalid email')
  static readonly USER_INVALID_PASSWORD = new ResponseError(4002, 'Invalid password')
  static readonly USER_INVALID_FIRST_NAME = new ResponseError(4003, 'Invalid firstName')
  static readonly USER_INVALID_LAST_NAME = new ResponseError(4004, 'Invalid lastName')

  // Task-Validation
  static readonly TASK_INVALID_TITLE = new ResponseError(4005, 'Invalid title')
  static readonly TASK_INVALID_DESCRIPTION = new ResponseError(4006, 'Invalid description')
  static readonly TASK_INVALID_DATE = new ResponseError(4007, 'Invalid date')
  static readonly TASK_INVALID_IS_CHECKED = new ResponseError(4008, 'Invalid isChecked')
  static readonly TASK_INVALID_USER_ID = new ResponseError(4009, 'Invalid userId')


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

