import { Injectable } from '@nestjs/common';
import { Tasks } from '../interfaces/Tasks';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create.task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Tasks') private readonly taskModel: Model<Tasks>) {}

  async getTasks(): Promise<Tasks[]> {
    const task = await this.taskModel.find();
    return task;
  }

  async getOne(id: string): Promise<Tasks> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async createTask(task: CreateTaskDto): Promise<Tasks> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async update(id: string, data: CreateTaskDto): Promise<Tasks> {
    const updateTask = await this.taskModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateTask;
  }

  async delete(id: string) {
    const deleteTask = await this.taskModel.findByIdAndDelete(id);
    return deleteTask;
  }
}
