import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new ForbiddenException('User not authenticated');

    const projectId = request.params.projectId || request.params.id || request.body.projectId;
    if (!projectId) return true; // Si no hay projectId en params/body, pasa (ej. creación general)

    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    const isOwner = project.ownerId.toString() === user._id.toString();
    const isMember = project.members.some(memberId => memberId.toString() === user._id.toString());

    if (!isOwner && !isMember) {
      throw new ForbiddenException('You do not have access to this project');
    }

    request.project = project; // guardamos el proyecto para uso posterior
    return true;
  }
}
