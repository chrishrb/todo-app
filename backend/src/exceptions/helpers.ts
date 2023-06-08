import { ValidatorOptions, validate } from "class-validator";
import { ValidationError } from "./errors/validation-error";
import { ErrorSchema } from "../schemas/error.schema";

function getAllConstraints(constraints: object | undefined, defaultMsg: string | number) {
  return constraints !== undefined ? Object.values(constraints)[0] : defaultMsg;
}

export async function validateSafe(object: object, validatorOptions?: ValidatorOptions): Promise<void> {
  const errors = await validate(object, validatorOptions);

  if (errors.length > 0) {
    const err: ErrorSchema[] = errors.map(error => {
      const defaultErrorMessage = getAllConstraints(error.constraints, `${error.property} not valid`)
      const errorCode = getAllConstraints(error.contexts, 4000)['errorCode']
      const errorMessage = getAllConstraints(error.contexts, defaultErrorMessage)['errorMessage']

      return {field: error.property, value: error.value, replyCode: errorCode, replyMessage: errorMessage} as ErrorSchema
    })
    throw new ValidationError(err);
  }
}

export function notEmpty(value: string | null | undefined) {
  return value != undefined && value != null && value.trim() !== '';
}
