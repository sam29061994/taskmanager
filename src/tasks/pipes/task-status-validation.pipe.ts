// import { BadRequestException, PipeTransform } from '@nestjs/common';

// export class TaskStatusValidationPipe implements PipeTransform {
//   readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.DONE];

//   private isStatusValid(status: any) {
//     return this.allowedStatuses.indexOf(status) === -1 ? false : true;
//   }

//   transform(value: string) {
//     if (this.isStatusValid(value.toUpperCase())) return value;
//     throw new BadRequestException(`${value} is not a valid status`);
//   }
// }
