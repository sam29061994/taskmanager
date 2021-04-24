import { Controller, Get, Post, Query, Delete, Body, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { TaskStatus, Task, TaskDocument } from "./task.model";
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDTO: CreateTaskDTO
  ) {
    const generatedId = await this.tasksService.createTask(createTaskDTO);
    return { id: generatedId };
  }

  @Get()
  async getTasks(@Query(ValidationPipe) getTaskFilterDTO: GetTaskFilterDTO) {
    let tasks: TaskDocument[] = [];
    if (Object.keys(getTaskFilterDTO).length > 0) {
      tasks = await this.tasksService.getTasksWithFilters(getTaskFilterDTO);
    } else {

      tasks = await this.tasksService.getTasks();
    }
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status
    }));
  }

  @Get('/:id')
  async getTask(
    @Param('id') id: string
  ) {
    const task = await this.tasksService.getTask(id);
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    await this.tasksService.updateTask(id, title, description);
    return null;
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus

  ) {
    await this.tasksService.updateTaskStatus(id, status);
    return null;
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string
  ) {
    await this.tasksService.deleteTask(id);
    return null;

  }



};