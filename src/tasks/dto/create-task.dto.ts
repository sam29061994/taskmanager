import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(0, 50)
  title: string;
}
