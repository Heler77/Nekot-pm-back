import { BoardService } from './board.service';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getProjects(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createProject(req: any, body: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getProject(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    inviteMember(id: string, email: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getColumns(projectId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/column.schema").ColumnDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/column.schema").Column & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createColumn(projectId: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/column.schema").ColumnDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/column.schema").Column & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getTasks(projectId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/task.schema").TaskDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/task.schema").Task & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createTask(projectId: string, body: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../schemas/task.schema").TaskDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/task.schema").Task & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, import("../schemas/task.schema").TaskDocument, import("../schemas/task.schema").TaskDocument>>;
    reorderTasks(projectId: string, body: any): Promise<{
        success: boolean;
    }>;
    updateTask(projectId: string, taskId: string, body: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../schemas/task.schema").TaskDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/task.schema").Task & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, import("../schemas/task.schema").TaskDocument, import("../schemas/task.schema").TaskDocument>>;
    deleteTask(projectId: string, taskId: string): Promise<{
        success: boolean;
    }>;
    updateProject(id: string, body: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, import("../schemas/project.schema").ProjectDocument, import("../schemas/project.schema").ProjectDocument>>;
    deleteProject(req: any, id: string): Promise<{
        success: boolean;
    }>;
    removeMember(req: any, id: string, memberId: string): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, import("../schemas/project.schema").ProjectDocument, import("../schemas/project.schema").ProjectDocument>>;
    removeLink(id: string, key: string): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../schemas/project.schema").ProjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/project.schema").Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, import("../schemas/project.schema").ProjectDocument, import("../schemas/project.schema").ProjectDocument>>;
}
