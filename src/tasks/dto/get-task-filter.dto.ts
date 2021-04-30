import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
export class GetTaskFilterDto {
  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
