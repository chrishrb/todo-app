import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ResponseError } from "../exceptions/response-details";

/**
 * CreateTaskSchema
 *
 * @typedef {object} CreateTaskSchema
 * @property {string} title.required - Title
 * @property {string} userId.required - UserId
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 * @property {string} tag - Tag
 * @property {string} tagColor - Tag Color
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
  @IsDateString(undefined, {
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  dueDate: string | null;

  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  tag: string | null;
  
  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  tagColor: string | null;

  constructor(title: string, userId: string, description: string | null, dueDate: string | null, tag: string | null, tagColor: string | null) {
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tag = tag;
    this.tagColor = tagColor;
  }
}

/**
 * CreateTaskMeSchema
 *
 * @typedef {object} CreateTaskMeSchema
 * @property {string} title.required - Title
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 * @property {string} tag - Tag
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
  @IsDateString(undefined, {
    context: {
      errorCode: ResponseError.TASK_INVALID_DATE.errorCode,
      errorMessage: ResponseError.TASK_INVALID_DATE.errorMessage
    }
  })
  dueDate: string | null;

  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  tag: string | null; 

  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  tagColor: string | null;

  constructor(title: string, description: string | null, dueDate: string, tag: string | null, tagColor: string | null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tag = tag;
    this.tagColor = tagColor;
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
 * @property {string|null} tag - Tag
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
  @IsDateString(undefined, {
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

  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  tag: string | null; 

  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  tagColor: string | null;
  
  constructor(title: string | null, description: string | null, dueDate: string | null, isChecked: boolean | null, tag: string | null, tagColor: string | null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isChecked = isChecked;
    this.tag = tag;
    this.tagColor = tagColor;
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
 * @property {string} tag - Tag
 */
export class ReadTaskSchema {
  id: string;
  title: string;
  userId: string;
  description: string | null;
  dueDate: string | null | undefined;
  isChecked: boolean;
  tag: string | null;
  tagColor: string | null;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string, 
    userId: string, 
    title: string, 
    description: string | null, 
    dueDate: string | null | undefined, 
    isChecked: boolean, 
    tag: string | null,
    tagColor: string | null, 
    createdAt: string, 
    updatedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.description = description;
    this.dueDate = dueDate,
    this.isChecked = isChecked;
    this.tag = tag;
    this.tagColor = tagColor;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * GetTasksWithSpecifiedTagSchema
 *
 * @typedef {object} GetTasksWithSpecifiedTagSchema
 * @property {string} tag - Tag
 */
export class GetTasksWithSpecifiedTagSchema {
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGNAME.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGNAME.errorMessage
    }
  })
  tag: string;
  
  @IsOptional({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  @IsString({
    context: {
      errorCode: ResponseError.TAG_INVALID_TAGCOLOR.errorCode,
      errorMessage: ResponseError.TAG_INVALID_TAGCOLOR.errorMessage
    }
  })
  tagColor: string | null;

  constructor(tag: string, tagColor: string | null) {
    this.tag = tag;
    this.tagColor = tagColor;
  }
}
