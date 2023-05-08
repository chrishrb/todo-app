import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class TaskSchema {

  @IsString()
  title: string;

  @IsBoolean()
  isChecked: boolean

  @IsString()
  description: string;
  
  @IsDate()
  dueDate: Date;

  constructor(title: string, description: string, dueDate: Date) {
    this.isChecked = false;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

/**
 * CreateTaskSchema
 *
 * @typedef {object} CreateTaskSchema
 * @property {string} title.required - Title
 * @property {string} description - Description
 * @property {string} duedate - Due date
 */
export class CreateTaskSchema extends TaskSchema {
  constructor(title: string, description: string, dueDate: Date) {
    super(title, description, dueDate);
  }
}

/**
 * UpdateTaskSchema
 *
 * @typedef {object} UpdateTaskSchema
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} duedate - Due date
 */
export class UpdateTaskSchema extends TaskSchema {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsDate()
  dueDate: Date;
  
  constructor(title: string, description: string, dueDate: Date) {
    super(title, description, dueDate);
  }
}

/**
 * ReadTaskSchema
 *
 * @typedef {object} ReadTaskSchema
 * @property {number} id - ID
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} dueDate - Due date
 */
export class ReadTaskSchema extends TaskSchema {
  @IsNumber()
  id: number;

  constructor(userId: number, title: string, description: string, dueDate: Date, isChecked: boolean) {
    super(title, description, dueDate);
    this.isChecked = isChecked;
    this.id = userId;
  }
}
