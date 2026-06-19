import { Document, Types } from 'mongoose';
export type ColumnDocument = Column & Document;
export declare class Column {
    title: string;
    projectId: Types.ObjectId | string;
    position: number;
}
export declare const ColumnSchema: import("mongoose").Schema<Column, import("mongoose").Model<Column, any, any, any, any, any, Column>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Column, Document<unknown, {}, Column, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Column & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Column, Document<unknown, {}, Column, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Column & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    projectId?: import("mongoose").SchemaDefinitionProperty<string | Types.ObjectId, Column, Document<unknown, {}, Column, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Column & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    position?: import("mongoose").SchemaDefinitionProperty<number, Column, Document<unknown, {}, Column, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Column & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Column>;
