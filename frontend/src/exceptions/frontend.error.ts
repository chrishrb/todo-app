import i18n from "@/i18n";

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

// see backend: src/exceptions/error-details.ts
function getTextFromErrorCode(errorCode?: number) {
  const { t, te } = i18n.global
  return te(`errors.${errorCode}`) ? t(`errors.${errorCode}`) : null;
}

export function getErrorText(errorDetails?: ErrorDetailsSchema[]) {
  const { t } = i18n.global
  if (!errorDetails) {
    return t('errors.default');
  }
  const text = errorDetails.map(detail => getTextFromErrorCode(detail.replyCode)).join("\n");
  if (!text) {
    return t('errors.default');
  }
  return text;
}
