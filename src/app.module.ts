import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { TasksModule } from './tasks/task.module';

@Module({
  imports: [TasksModule,ConfigModule.forRoot({isGlobal:true}), MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING)],
})
export class AppModule {}
