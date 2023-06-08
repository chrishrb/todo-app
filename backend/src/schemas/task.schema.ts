import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ResponseError } from "../exceptions/response-details";

/**
 * CreateTaskSchema
 *
 * @typedef {object} CreateTaskSchema
 * @property {string} title.required - Title
 * @property {string} userId.required - UserId
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 */
export class CreateTaskSchema {
  @IsUUID(4, {
    context: {
      errorCode: ResponseError.TASK_INVALID_USER_ID.errorCode,
      errorMessage: ResponseError.TASK_INVALID_USER_ID.errorMessage
    }
  })
  userId: string;

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
  title: string;

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
  description: string | null; 

  @IsOptional({
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  @IsDate({
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  dueDate: string | null;

  constructor(title: string, userId: string, description: string | null, dueDate: string | null) {
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

/**
 * CreateTaskMeSchema
 *
 * @typedef {object} CreateTaskMeSchema
 * @property {string} title.required - Title
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 */
export class CreateTaskMeSchema {
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
  title: string;

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
  description: string | null; 

  @IsOptional({
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  @IsDate({
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  dueDate: string | null;

  constructor(title: string, description: string | null, dueDate: string) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

/**
 * UpdateTaskSchema
 *
 * @typedef {object} UpdateTaskSchema
 * @property {string|null} title - Title
 * @property {string|null} description - Description
 * @property {string|null} dueDate - Due date - date-time
 * @property {boolean|null} isChecked - Is completed?
 */
export class UpdateTaskSchema {
  @IsOptional({
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
  title: string | null;

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
  description: string | null;

  @IsOptional({
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  @IsDate({
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  dueDate: string | null;

  @IsOptional({
    context: {
      errorCode: ResponseError.TASK_INVALID_IS_CHECKED.errorCode,
      errorMessage: ResponseError.TASK_INVALID_IS_CHECKED.errorMessage
    }
  })
  @IsBoolean({
    context: {
      errorCode: ResponseError.TASK_INVALID_IS_CHECKED.errorCode,
      errorMessage: ResponseError.TASK_INVALID_IS_CHECKED.errorMessage
    }
  })
  isChecked: boolean | null;
  
  constructor(title: string | null, description: string | null, dueDate: string | null, isChecked: boolean | null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isChecked = isChecked;
  }
}

/**
 * ReadTaskSchema
 *
 * @typedef {object} ReadTaskSchema
 * @property {string} id - ID
 * @property {string} userId - UserId
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 * @property {boolean} isChecked - Is Checked
 */
export class ReadTaskSchema {
  id: string;
  title: string;
  userId: string;
  description: string | null;
  dueDate: string | null | undefined;
  isChecked: boolean;

  constructor(id: string, userId: string, title: string, description: string | null, dueDate: string | null | undefined, isChecked: boolean) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.description = description;
    this.dueDate = dueDate,
    this.isChecked = isChecked;
  }
}
