import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    const tasks = await this.tasksService.findAll(boardId);
    return tasks;
  }

  @Get(':id')
  async findOne(@Res() res, @Param() params): Promise<Task | void> {
    try {
      const { boardId, id } = params;
      const task = await this.tasksService.findOne(boardId, id);
      if (task) {
        res.status(HttpStatus.OK).json(task);
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param() params,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task | void> {
    try {
      const { boardId } = params;
      const task = await this.tasksService.create(boardId, createTaskDto);
      return task;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() params,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task | void> {
    try {
      const { boardId, id } = params;
      const task = await this.tasksService.update(boardId, id, updateTaskDto);
      return task;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param() params) {
    const { boardId, id } = params;
    try {
      await this.tasksService.remove(boardId, id);
      res.status(HttpStatus.NO_CONTENT).json(null);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
