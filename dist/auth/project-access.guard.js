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
exports.ProjectAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../schemas/project.schema");
let ProjectAccessGuard = class ProjectAccessGuard {
    projectModel;
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user)
            throw new common_1.ForbiddenException('User not authenticated');
        const projectId = request.params.projectId || request.params.id || request.body.projectId;
        if (!projectId)
            return true;
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const isOwner = project.ownerId.toString() === user._id.toString();
        const isMember = project.members.some(memberId => memberId.toString() === user._id.toString());
        if (!isOwner && !isMember) {
            throw new common_1.ForbiddenException('You do not have access to this project');
        }
        request.project = project;
        return true;
    }
};
exports.ProjectAccessGuard = ProjectAccessGuard;
exports.ProjectAccessGuard = ProjectAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectAccessGuard);
//# sourceMappingURL=project-access.guard.js.map