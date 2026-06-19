import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ColumnDocument = Column & Document;

@Schema({ timestamps: true })
export class Column {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId | string;

  @Prop({ required: true })
  position: number;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
