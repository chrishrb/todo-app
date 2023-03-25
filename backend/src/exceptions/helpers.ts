import { ValidatorOptions, validate } from "class-validator";
import { ValidationError } from "./errors/validation-error";

export async function validateSafe(object: object, validatorOptions?: ValidatorOptions): Promise<void> {
  const errors = await validate(object, validatorOptions);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
