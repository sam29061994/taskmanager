import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskDocument, TaskStatus } from "./task.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Task } from './task.model';
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>
  ) { }

  async createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;

    const newTask = new this.taskModel({ title, description, status: TaskStatus.OPEN })
    const result = await newTask.save();
    return result.id as string;
  }

  async getTasks() {
    const tasks = await this.taskModel.find().exec();
    return tasks as TaskDocument[];
  }

  async getTasksWithFilters(getTaskFilterDTO: GetTaskFilterDTO) {
    const { status, search } = getTaskFilterDTO;
    let tasks = [];

    if (search) {
      tasks = await this.taskModel.find({ title: new RegExp(search) })
      return tasks;
    }
    if (status) {
      tasks = await this.taskModel.find({ status: status });
      return tasks;
    }
    tasks = await this.taskModel.find({ title: new RegExp(search), status: status })
    return tasks;
  }

  async getTask(id: string) {
    const task = await this.findTask(id);
    return task;
  }

  async updateTask(id: string, title: string, description: string) {
    const task = await this.findTask(id);
    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.findTask(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: string) {
    const result = await this.taskModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('could not find the task');
    }
  }

  private async findTask(id: string): Promise<TaskDocument> {

    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException(`task not found with id:${id}`)
    }
    return task;

  }

}