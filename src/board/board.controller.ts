import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectAccessGuard } from '../auth/project-access.guard';

@UseGuards(AuthGuard)
@Controller('api')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // Projects
  @Get('projects')
  getProjects(@Request() req) {
    return this.boardService.getProjects(req.user._id);
  }

  @Post('projects')
  createProject(@Request() req, @Body() body: any) {
    return this.boardService.createProject(req.user._id, body);
  }

  @UseGuards(ProjectAccessGuard)
  @Get('projects/:projectId')
  getProject(@Param('projectId') id: string) {
    return this.boardService.getProject(id);
  }

  @UseGuards(ProjectAccessGuard)
  @Post('projects/:projectId/invite')
  inviteMember(@Param('projectId') id: string, @Body('email') email: string) {
    return this.boardService.inviteMember(id, email);
  }

  // Columns
  @UseGuards(ProjectAccessGuard)
  @Get('projects/:projectId/columns')
  getColumns(@Param('projectId') projectId: string) {
    return this.boardService.getColumns(projectId);
  }

  @UseGuards(ProjectAccessGuard)
  @Post('projects/:projectId/columns')
  createColumn(@Param('projectId') projectId: string, @Body() body: any) {
    return this.boardService.createColumn(projectId, body);
  }

  // Tasks
  @UseGuards(ProjectAccessGuard)
  @Get('projects/:projectId/tasks')
  getTasks(@Param('projectId') projectId: string) {
    return this.boardService.getTasks(projectId);
  }

  @UseGuards(ProjectAccessGuard)
  @Post('projects/:projectId/tasks')
  createTask(@Param('projectId') projectId: string, @Body() body: any) {
    return this.boardService.createTask(projectId, body);
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('projects/:projectId/tasks/reorder')
  reorderTasks(@Param('projectId') projectId: string, @Body() body: any) {
    return this.boardService.reorderTasks(projectId, body.updates);
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('projects/:projectId/tasks/:taskId')
  updateTask(@Param('projectId') projectId: string, @Param('taskId') taskId: string, @Body() body: any) {
    return this.boardService.updateTask(projectId, taskId, body);
  }

  @UseGuards(ProjectAccessGuard)
  @Delete('projects/:projectId/tasks/:taskId')
  deleteTask(@Param('projectId') projectId: string, @Param('taskId') taskId: string) {
    return this.boardService.deleteTask(projectId, taskId);
  }

  // Update project details
  @UseGuards(ProjectAccessGuard)
  @Patch('projects/:projectId')
  updateProject(@Param('projectId') id: string, @Body() body: any) {
    return this.boardService.updateProject(id, body);
  }

  // Delete a project (owner only)
  @UseGuards(ProjectAccessGuard)
  @Delete('projects/:projectId')
  deleteProject(@Request() req, @Param('projectId') id: string) {
    return this.boardService.deleteProject(id, req.user._id);
  }

  // Remove a member from a project (owner only)
  @UseGuards(ProjectAccessGuard)
  @Delete('projects/:projectId/members/:memberId')
  removeMember(@Request() req, @Param('projectId') id: string, @Param('memberId') memberId: string) {
    return this.boardService.removeMember(id, memberId, req.user._id);
  }

  // Remove a link from additionalInfo
  @UseGuards(ProjectAccessGuard)
  @Delete('projects/:projectId/links/:key')
  removeLink(@Param('projectId') id: string, @Param('key') key: string) {
    return this.boardService.removeLink(id, key);
  }
}
