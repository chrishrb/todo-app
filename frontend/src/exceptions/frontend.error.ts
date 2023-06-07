export type ErrorDetailsSchema = {
  field: string;
  value?: string;
  error?: string;
}

export class FrontendError extends Error {
  public errorCode: number;
  public errorMessage: string;
  public details?: ErrorDetailsSchema[];

  constructor(errorCode: number, errorMessage: string, details?: ErrorDetailsSchema[]) {
    super();

    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.details = details;
  }

  print() {
    return {
      errorCode: this.errorCode,
      errorMessage: this.errorMessage,
      details: this.details,
    }
  }
}
