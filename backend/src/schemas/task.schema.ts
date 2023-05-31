import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";

class TaskSchema {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsBoolean()
  isChecked?: boolean

  constructor(title: string) {
    this.title = title;
    this.isChecked = false;
 }
}

/**
 * CreateTaskSchema
 *
 * @typedef {object} CreateTaskSchema
 * @property {string} title.required - Title
 * @property {string} userId.required - UserId
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 */
export class CreateTaskSchema extends TaskSchema {
  @IsUUID(4)
  userId: string;

  @IsOptional()
  @IsString()
  description: string | null; 

  @IsOptional()
  @IsDate()
  dueDate: string | null;

  constructor(title: string, userId: string, description: string | null, dueDate: string | null) {
    super(title)
    this.userId = userId;
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
export class CreateTaskMeSchema extends TaskSchema {
  @IsOptional()
  @IsString()
  description: string | null; 

  @IsOptional()
  @IsDateString()
  dueDate: string | null;

  constructor(title: string, description: string | null, dueDate: string) {
    super(title)
    this.description = description;
    this.dueDate = dueDate;
  }
}

/**
 * UpdateTaskSchema
 *
 * @typedef {object} UpdateTaskSchema
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} dueDate - Due date - date-time
 * @property {boolean} isChecked - Is completed?
 */
export class UpdateTaskSchema extends TaskSchema {
  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsDate()
  dueDate: string | null;

  @IsOptional()
  @IsBoolean()
  isChecked: boolean;
  
  constructor(title: string, description: string | null, dueDate: string | null, isChecked: boolean) {
    super(title);
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
export class ReadTaskSchema extends TaskSchema {
  id: string;
  userId: string;
  description: string | null;
  dueDate: string | null | undefined;
  isChecked: boolean;

  constructor(id: string, userId: string, title: string, description: string | null, dueDate: string | null | undefined, isChecked: boolean) {
    super(title);
    this.id = id;
    this.userId = userId;
    this.description = description;
    this.dueDate = dueDate,
    this.isChecked = isChecked;
  }
}