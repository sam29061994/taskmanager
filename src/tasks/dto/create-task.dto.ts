import {IsNotEmpty, Length} from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @Length(0,15)
  title: string

  description: string
}