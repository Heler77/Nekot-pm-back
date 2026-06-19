import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProjectDocument } from '../schemas/project.schema';
export declare class ProjectAccessGuard implements CanActivate {
    private projectModel;
    constructor(projectModel: Model<ProjectDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
