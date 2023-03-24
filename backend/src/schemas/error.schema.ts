
export class ErrorSchema {
  status: number;
  errors: object;

  constructor(status: number, errors: object) {
    this.status = status;
    this.errors = errors;
  }
}
