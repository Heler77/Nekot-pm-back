import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { Column, ColumnDocument } from '../schemas/column.schema';
import { Task, TaskDocument } from '../schemas/task.schema';
export declare class BoardService {
    private userModel;
    private projectModel;
    private columnModel;
    private taskModel;
    constructor(userModel: Model<UserDocument>, projectModel: Model<ProjectDocument>, columnModel: Model<ColumnDocument>, taskModel: Model<TaskDocument>);
    getProjects(userId: string): Promise<(import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createProject(userId: string, body: any): Promise<import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getProject(projectId: string): Promise<(import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    inviteMember(projectId: string, email: string): Promise<import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getColumns(projectId: string): Promise<(import("mongoose").Document<unknown, {}, ColumnDocument, {}, import("mongoose").DefaultSchemaOptions> & Column & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createColumn(projectId: string, body: any): Promise<import("mongoose").Document<unknown, {}, ColumnDocument, {}, import("mongoose").DefaultSchemaOptions> & Column & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getTasks(projectId: string): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, import("mongoose").DefaultSchemaOptions> & Task & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createTask(projectId: string, body: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, TaskDocument, {}, import("mongoose").DefaultSchemaOptions> & Task & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, TaskDocument, TaskDocument>>;
    updateTask(projectId: string, taskId: string, body: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, TaskDocument, {}, import("mongoose").DefaultSchemaOptions> & Task & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, TaskDocument, TaskDocument>>;
    deleteTask(projectId: string, taskId: string): Promise<{
        success: boolean;
    }>;
    reorderTasks(projectId: string, updates: any[]): Promise<{
        success: boolean;
    }>;
    updateProject(projectId: string, body: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, ProjectDocument, ProjectDocument>>;
    deleteProject(projectId: string, userId: string): Promise<{
        success: boolean;
    }>;
    removeMember(projectId: string, memberId: string, requestingUserId: string): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, ProjectDocument, ProjectDocument>>;
    removeLink(projectId: string, key: string): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, ProjectDocument, ProjectDocument>>;
}
