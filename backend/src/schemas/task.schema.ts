import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class TaskSchema {

  @IsNumber()
  id: number

  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isChecked: boolean

  @IsString()
  description: string;
  
  @IsDate()
  dueDate: Date;

  constructor() {
    this.isChecked = false;
  }
}

export class CreateTaskSchema extends TaskSchema {
  constructor(title: string, description: string, dueDate: Date) {
    super();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

export class UpdateTaskSchema extends TaskSchema {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  dueDate: Date;
  
  constructor(title: string, description: string, dueDate: Date) {
    super()
    this.title = title
    this.description = description; 
    this.dueDate = dueDate;
  }
}

export class ReadTaskSchema extends TaskSchema {
  @IsNumber()
  id: number;

  constructor(id: number, title: string, description: string, dueDate: Date, isChecked: boolean) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isChecked = isChecked;

  }
}
