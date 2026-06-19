"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const project_schema_1 = require("../schemas/project.schema");
const column_schema_1 = require("../schemas/column.schema");
const task_schema_1 = require("../schemas/task.schema");
let BoardService = class BoardService {
    userModel;
    projectModel;
    columnModel;
    taskModel;
    constructor(userModel, projectModel, columnModel, taskModel) {
        this.userModel = userModel;
        this.projectModel = projectModel;
        this.columnModel = columnModel;
        this.taskModel = taskModel;
    }
    async getProjects(userId) {
        return this.projectModel.find({
            $or: [{ ownerId: userId }, { members: userId }],
        }).populate('ownerId members', 'name email avatar');
    }
    async createProject(userId, body) {
        const project = await this.projectModel.create({
            ...body,
            ownerId: userId,
            members: [],
        });
        const columnsToCreate = [
            { title: 'TODO', projectId: project._id, position: 0 },
            { title: 'IN PROGRESS', projectId: project._id, position: 1 },
            { title: 'TEST', projectId: project._id, position: 2 },
            { title: 'BLOCKED', projectId: project._id, position: 3 },
            { title: 'DONE', projectId: project._id, position: 4 },
        ];
        await this.columnModel.insertMany(columnsToCreate);
        return project;
    }
    async getProject(projectId) {
        return this.projectModel.findById(projectId).populate('ownerId members', 'name email avatar');
    }
    async inviteMember(projectId, email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('User with that email not found');
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId.toString() === user._id.toString() || project.members.includes(user._id)) {
            throw new common_1.BadRequestException('User is already a member');
        }
        project.members.push(user._id);
        await project.save();
        return project;
    }
    async getColumns(projectId) {
        let columns = await this.columnModel.find({ projectId }).sort('position');
        if (columns.length === 0) {
            const columnsToCreate = [
                { title: 'TODO', projectId, position: 0 },
                { title: 'IN PROGRESS', projectId, position: 1 },
                { title: 'TEST', projectId, position: 2 },
                { title: 'BLOCKED', projectId, position: 3 },
                { title: 'DONE', projectId, position: 4 },
            ];
            await this.columnModel.insertMany(columnsToCreate);
            columns = await this.columnModel.find({ projectId }).sort('position');
        }
        return columns;
    }
    async createColumn(projectId, body) {
        const columns = await this.columnModel.find({ projectId });
        return this.columnModel.create({
            title: body.title,
            projectId,
            position: columns.length,
        });
    }
    async getTasks(projectId) {
        return this.taskModel
            .find({ projectId })
            .sort('position')
            .populate('assigneeId assigneeIds', 'name email avatar');
    }
    async createTask(projectId, body) {
        const task = await this.taskModel.create({
            ...body,
            projectId,
        });
        return task.populate('assigneeIds', 'name email avatar');
    }
    async updateTask(projectId, taskId, body) {
        const task = await this.taskModel.findOne({ _id: taskId, projectId });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        if (body.title !== undefined)
            task.title = body.title;
        if (body.description !== undefined)
            task.description = body.description;
        if (body.assigneeIds !== undefined)
            task.assigneeIds = body.assigneeIds;
        await task.save();
        return task.populate('assigneeIds', 'name email avatar');
    }
    async deleteTask(projectId, taskId) {
        const res = await this.taskModel.deleteOne({ _id: taskId, projectId });
        if (res.deletedCount === 0)
            throw new common_1.NotFoundException('Task not found');
        return { success: true };
    }
    async reorderTasks(projectId, updates) {
        const bulkOps = updates.map(update => ({
            updateOne: {
                filter: { _id: update.taskId, projectId },
                update: { $set: { columnId: update.columnId, position: update.position } },
            },
        }));
        if (bulkOps.length > 0) {
            await this.taskModel.bulkWrite(bulkOps);
        }
        return { success: true };
    }
    async updateProject(projectId, body) {
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (body.title !== undefined)
            project.title = body.title;
        if (body.description !== undefined)
            project.description = body.description;
        if (body.clientName !== undefined)
            project.clientName = body.clientName;
        if (body.additionalInfo !== undefined) {
            project.additionalInfo = { ...project.additionalInfo, ...body.additionalInfo };
        }
        await project.save();
        return project.populate('ownerId members', 'name email avatar');
    }
    async deleteProject(projectId, userId) {
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId.toString() !== userId.toString()) {
            throw new common_1.ForbiddenException('Solo el dueño puede eliminar el proyecto');
        }
        await this.taskModel.deleteMany({ projectId });
        await this.columnModel.deleteMany({ projectId });
        await this.projectModel.deleteOne({ _id: projectId });
        return { success: true };
    }
    async removeMember(projectId, memberId, requestingUserId) {
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId.toString() !== requestingUserId.toString()) {
            throw new common_1.ForbiddenException('Solo el dueño puede eliminar miembros');
        }
        project.members = project.members.filter((m) => m.toString() !== memberId.toString());
        await project.save();
        return project.populate('ownerId members', 'name email avatar');
    }
    async removeLink(projectId, key) {
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const info = { ...(project.additionalInfo || {}) };
        delete info[key];
        project.additionalInfo = info;
        project.markModified('additionalInfo');
        await project.save();
        return project.populate('ownerId members', 'name email avatar');
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __param(2, (0, mongoose_1.InjectModel)(column_schema_1.Column.name)),
    __param(3, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], BoardService);
//# sourceMappingURL=board.service.js.map