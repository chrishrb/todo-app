import { ValidatorOptions, validate } from "class-validator";
import { ValidationError } from "./errors/validation-error";
import { ErrorSchema } from "../schemas/error.schema";

export async function validateSafe(object: object, validatorOptions?: ValidatorOptions): Promise<void> {
  const errors = await validate(object, validatorOptions);

  if (errors.length > 0) {
    const err: ErrorSchema[] = errors.map(error => {
      const simpleError = error.constraints !== undefined ? Object.values(error.constraints)[0] : `${error.property} not valid.`;
      return {field: error.property, value: error.value, error: simpleError} as ErrorSchema
    })
    throw new ValidationError(err);
  }
}
