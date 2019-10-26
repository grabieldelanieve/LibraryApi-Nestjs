import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
  NotFoundException,
  HttpStatus,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { CreateTaskDto } from '../dto/create.task.dto';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get('/')
  async getTasks(@Res() res) {
    const tasks = await this.tasksServices.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/:id')
  async getOne(@Res() res, @Param('id') id) {
    const task = await this.tasksServices.getOne(id);
    if (!task) throw new NotFoundException('Task Does not exists');
    return res.status(HttpStatus.OK).json(task);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() files) {
    console.log(files);
  }

  @Post()
  addTask(@Body() body: CreateTaskDto) {
    return this.tasksServices.createTask(body);
  }

  @Put('/')
  async updateTask(@Res() res, @Body() body: CreateTaskDto, @Query('id') id) {
    const taskUpdate = await this.tasksServices.update(id, body);
    if (!taskUpdate) throw new NotFoundException('Task does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Task Updated Successfully',
      taskUpdate,
    });
  }

  @Delete('/:id')
  async deleteTask(@Res() res, @Param('id') id) {
    const task = await this.tasksServices.delete(id);
    if (!task) throw new NotFoundException('Task Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Task Deleted Succesfully',
      task,
    });
  }
}

// sdfffffffffffffffffffffffffffffffffffffffffffffffffffffffff
