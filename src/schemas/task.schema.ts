import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId | string;

  @Prop({ type: Types.ObjectId, ref: 'Column', required: true })
  columnId: Types.ObjectId | string;

  @Prop({ required: true })
  position: number;

  // Backward compatible single assignee (deprecated in favor of assigneeIds)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  assigneeId: Types.ObjectId | string;

  // One or more responsibles for the task
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  assigneeIds: (Types.ObjectId | string)[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
