import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskDocument } from './task.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SelectAllTasks } from './dto/select-all-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(createTaskDTO: CreateTaskDto) {
    const { title } = createTaskDTO;

    const newTask = new this.taskModel({
      title,
      completed: false,
      createdAt: Date.now().toString(),
    });
    const result = await newTask.save();
    return result;
  }

  async getTasks() {
    const tasks = await this.taskModel.find().exec();
    return tasks as TaskDocument[];
  }

  async getTasksWithFilters(getTaskFilterDTO: GetTaskFilterDto) {
    const { completed, search } = getTaskFilterDTO;
    let tasks = [];

    if (search && completed) {
      tasks = await this.taskModel.find({
        title: new RegExp(search),
        completed: completed,
      });
      return tasks;
    }

    if (search) {
      tasks = await this.taskModel.find({ title: new RegExp(search) });
      return tasks;
    }
    if (completed) {
      tasks = await this.taskModel.find({ completed: completed });
      return tasks;
    }
  }

  async getTask(id: string) {
    const task = await this.findTask(id);
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const { title, completed } = updateTaskDto;
    const task = await this.findTask(id);
    task.title = title || task.title;
    task.completed = completed || task.completed;

    await task.save();

    return task;
  }

  async selectAllTasks(selectAllTasks: SelectAllTasks) {
    const { completed } = selectAllTasks;
    try {
      await this.taskModel.updateMany({}, { completed });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async updateTaskStatus(id: string, completed: boolean) {
    const task = await this.findTask(id);
    task.completed = completed;

    await task.save();

    return task;
  }

  async deleteTask(id: string) {
    const result = await this.taskModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('could not find the task');
    }
  }

  async deleteCompletedTasks() {
    await this.taskModel.deleteMany({ completed: true }).exec();
  }

  private async findTask(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException(`task not found with id:${id}`);
    }
    return task;
  }
}
