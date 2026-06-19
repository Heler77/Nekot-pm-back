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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("./board.service");
const auth_guard_1 = require("../auth/auth.guard");
const project_access_guard_1 = require("../auth/project-access.guard");
let BoardController = class BoardController {
    boardService;
    constructor(boardService) {
        this.boardService = boardService;
    }
    getProjects(req) {
        return this.boardService.getProjects(req.user._id);
    }
    createProject(req, body) {
        return this.boardService.createProject(req.user._id, body);
    }
    getProject(id) {
        return this.boardService.getProject(id);
    }
    inviteMember(id, email) {
        return this.boardService.inviteMember(id, email);
    }
    getColumns(projectId) {
        return this.boardService.getColumns(projectId);
    }
    createColumn(projectId, body) {
        return this.boardService.createColumn(projectId, body);
    }
    getTasks(projectId) {
        return this.boardService.getTasks(projectId);
    }
    createTask(projectId, body) {
        return this.boardService.createTask(projectId, body);
    }
    reorderTasks(projectId, body) {
        return this.boardService.reorderTasks(projectId, body.updates);
    }
    updateTask(projectId, taskId, body) {
        return this.boardService.updateTask(projectId, taskId, body);
    }
    deleteTask(projectId, taskId) {
        return this.boardService.deleteTask(projectId, taskId);
    }
    updateProject(id, body) {
        return this.boardService.updateProject(id, body);
    }
    deleteProject(req, id) {
        return this.boardService.deleteProject(id, req.user._id);
    }
    removeMember(req, id, memberId) {
        return this.boardService.removeMember(id, memberId, req.user._id);
    }
    removeLink(id, key) {
        return this.boardService.removeLink(id, key);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Get)('projects'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Post)('projects'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createProject", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Get)('projects/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getProject", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Post)('projects/:projectId/invite'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "inviteMember", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Get)('projects/:projectId/columns'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getColumns", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Post)('projects/:projectId/columns'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createColumn", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Get)('projects/:projectId/tasks'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getTasks", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Post)('projects/:projectId/tasks'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createTask", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Patch)('projects/:projectId/tasks/reorder'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "reorderTasks", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Patch)('projects/:projectId/tasks/:taskId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "updateTask", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Delete)('projects/:projectId/tasks/:taskId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Patch)('projects/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "updateProject", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Delete)('projects/:projectId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Delete)('projects/:projectId/members/:memberId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "removeMember", null);
__decorate([
    (0, common_1.UseGuards)(project_access_guard_1.ProjectAccessGuard),
    (0, common_1.Delete)('projects/:projectId/links/:key'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "removeLink", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map