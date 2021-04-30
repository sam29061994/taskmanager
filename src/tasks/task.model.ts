import * as mangoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TaskDocument = Task & mangoose.Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  completed: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
