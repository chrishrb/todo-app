export type ErrorDetailsSchema = {
  field: string;
  value?: string;
  replyCode?: number;
  replyMessage?: string;
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

// TODO: make i18n ready
// see backend: src/exceptions/error-details.ts
function getTextFromErrorCode(errorCode?: number) {
  switch (errorCode) {
    case 4001:
      return "Please enter a valid email address."
    case 4002:
      return "Please enter a valid password."
    case 4003:
      return "Please enter a valid first name."
    case 4004:
      return "Please enter a valid last name."
    case 4107:
      return "E-Mail already registered. Please sign in!"
    case 4200:
      return "Username not correct."
    case 4201:
      return "Password not correct. Please try again!"
  }
}

export function getErrorText(errorDetails?: ErrorDetailsSchema[]) {
  if (!errorDetails) {
    // TODO: make i18n ready
    return "Something did go wrong."
  }
  const text = errorDetails.map(detail => getTextFromErrorCode(detail.replyCode)).join("\n");
  if (!text) {
    // TODO: make i18n ready
    return "Something did go wrong."
  }
  return text;
}
