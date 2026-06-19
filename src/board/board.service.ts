import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { Column, ColumnDocument } from '../schemas/column.schema';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async getProjects(userId: string) {
    return this.projectModel.find({
      $or: [{ ownerId: userId }, { members: userId }],
    }).populate('ownerId members', 'name email avatar');
  }

  async createProject(userId: string, body: any) {
    const project = await this.projectModel.create({
      ...body,
      ownerId: userId,
      members: [],
    });

    // Auto-initialize 5 columns
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

  async getProject(projectId: string) {
    return this.projectModel.findById(projectId).populate('ownerId members', 'name email avatar');
  }

  async inviteMember(projectId: string, email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User with that email not found');

    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    if (project.ownerId.toString() === user._id.toString() || project.members.includes(user._id as any)) {
      throw new BadRequestException('User is already a member');
    }

    project.members.push(user._id as any);
    await project.save();
    return project;
  }

  async getColumns(projectId: string) {
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

  async createColumn(projectId: string, body: any) {
    const columns = await this.columnModel.find({ projectId });
    return this.columnModel.create({
      title: body.title,
      projectId,
      position: columns.length,
    });
  }


  async getTasks(projectId: string) {
    return this.taskModel
      .find({ projectId })
      .sort('position')
      .populate('assigneeId assigneeIds', 'name email avatar');
  }

  async createTask(projectId: string, body: any) {
    const task = await this.taskModel.create({
      ...body,
      projectId,
    });
    return task.populate('assigneeIds', 'name email avatar');
  }

  async updateTask(projectId: string, taskId: string, body: any) {
    const task = await this.taskModel.findOne({ _id: taskId, projectId });
    if (!task) throw new NotFoundException('Task not found');

    if (body.title !== undefined) task.title = body.title;
    if (body.description !== undefined) task.description = body.description;
    if (body.assigneeIds !== undefined) task.assigneeIds = body.assigneeIds;

    await task.save();
    return task.populate('assigneeIds', 'name email avatar');
  }

  async deleteTask(projectId: string, taskId: string) {
    const res = await this.taskModel.deleteOne({ _id: taskId, projectId });
    if (res.deletedCount === 0) throw new NotFoundException('Task not found');
    return { success: true };
  }

  async reorderTasks(projectId: string, updates: any[]) {
    // updates is an array of { taskId, columnId, position }
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

  async updateProject(projectId: string, body: any) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    if (body.title !== undefined) project.title = body.title;
    if (body.description !== undefined) project.description = body.description;
    if (body.clientName !== undefined) project.clientName = body.clientName;
    if (body.additionalInfo !== undefined) {
      project.additionalInfo = { ...project.additionalInfo, ...body.additionalInfo };
    }

    await project.save();
    return project.populate('ownerId members', 'name email avatar');
  }

  async deleteProject(projectId: string, userId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    // Only the owner can delete the whole project
    if (project.ownerId.toString() !== userId.toString()) {
      throw new ForbiddenException('Solo el dueño puede eliminar el proyecto');
    }

    // Cascade: remove all tasks and columns of the project
    await this.taskModel.deleteMany({ projectId });
    await this.columnModel.deleteMany({ projectId });
    await this.projectModel.deleteOne({ _id: projectId });

    return { success: true };
  }

  async removeMember(projectId: string, memberId: string, requestingUserId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    if (project.ownerId.toString() !== requestingUserId.toString()) {
      throw new ForbiddenException('Solo el dueño puede eliminar miembros');
    }

    project.members = project.members.filter(
      (m: any) => m.toString() !== memberId.toString(),
    ) as any;
    await project.save();
    return project.populate('ownerId members', 'name email avatar');
  }

  async removeLink(projectId: string, key: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    const info = { ...(project.additionalInfo || {}) };
    delete info[key];
    project.additionalInfo = info;
    project.markModified('additionalInfo');
    await project.save();
    return project.populate('ownerId members', 'name email avatar');
  }
}
