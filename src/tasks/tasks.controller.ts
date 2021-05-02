import {
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Body,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { SelectAllTasks } from './dto/select-all-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDocument } from './task.model';
import { TasksService } from './tasks.service';
import { User } from '../users/user.model';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDTO: CreateTaskDto,
    @GetUser() user: User,
  ) {
    Logger.verbose(
      `User ${user.username} retrieving all tasks. Data: ${JSON.stringify(
        createTaskDTO,
      )}`,
    );
    const result = await this.tasksService.createTask(createTaskDTO);
    const { _id: id, title, completed, createdAt } = result;

    return { id, title, completed, createdAt };
  }

  @Get()
  async getTasks(
    @Query(ValidationPipe) getTaskFilterDTO: GetTaskFilterDto,
    @GetUser() user: User,
  ) {
    let tasks: TaskDocument[] = [];
    if (Object.keys(getTaskFilterDTO).length > 0) {
      tasks = await this.tasksService.getTasksWithFilters(getTaskFilterDTO);
    } else {
      tasks = await this.tasksService.getTasks();
    }

    Logger.verbose(`User ${user.username} retrieving all tasks`);

    return tasks.map(({ id, title, completed, createdAt }) => ({
      id,
      title,
      completed,
      createdAt,
    }));
  }

  @Get('/:id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.getTask(id);

    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      time: task.createdAt,
    };
  }

  @Patch('/selectAll')
  @UsePipes(ValidationPipe)
  async selectAllTasks(@Body() selectAllTasks: SelectAllTasks) {
    await this.tasksService.selectAllTasks(selectAllTasks);

    return null;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.tasksService.updateTask(id, updateTaskDto);

    return null;
  }

  @Delete('/completed')
  async deleteCompletedTasks() {
    await this.tasksService.deleteCompletedTasks();
    return null;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);

    return null;
  }
}
