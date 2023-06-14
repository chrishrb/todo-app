import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ResponseError } from "../exceptions/response-details";

/**
 * CreateTagSchema
 *
 * @typedef {object} CreateTagSchema
 * @property {string} name.required - Name
 */
export class CreateTagSchema {

  @IsNotEmpty({
    context: {
      errorCode: ResponseError.TASK_INVALID_TITLE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_TITLE.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TASK_INVALID_TITLE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_TITLE.errorMessage
    }
  })
  name: string;

  constructor(name: string) {
    this.name = name
  }
}

/**
 * UpdateTagSchema
 *
 * @typedef {object} UpdateTagSchema
 * @property {string|null} name - Name
 */
export class UpdateTagSchema {

  @IsOptional({
    context: {
      errorCode: ResponseError.TASK_INVALID_DESCRIPTION.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DESCRIPTION.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TASK_INVALID_DESCRIPTION.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DESCRIPTION.errorMessage
    }
  })
  name: string | null;
  
  constructor(name: string | null) {
    this.name = name
  }
}

/**
 * ReadTaskSchema
 *
 * @typedef {object} ReadTagSchema
 * @property {string} id - ID
 * @property {string} name - Name
 */
export class ReadTagSchema {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    }
}
