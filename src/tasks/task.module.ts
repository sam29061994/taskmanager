import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { TaskSchema } from './task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    AuthModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
