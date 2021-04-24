import * as mangoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type TaskDocument = Task & mangoose.Document;

@Schema() 
export class Task {
  @Prop({required:true})
  title: string;

  @Prop({required:true})
  description:string;

  @Prop({required:true})
  status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export enum TaskStatus {
  OPEN = 'OPEN',
  DONE='DONE'
}