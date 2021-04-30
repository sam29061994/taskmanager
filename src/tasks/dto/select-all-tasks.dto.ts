import { IsBoolean } from 'class-validator';

export class SelectAllTasks {
  @IsBoolean()
  completed: boolean;
}
