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
  UseGuards,
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { VerifyGuard } from '../guards/verify.guard';
@Controller('boards/:boardId/tasks')
@UseGuards(VerifyGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    const tasks = await this.tasksService.findAll(boardId);
    return tasks;
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Task | void> {
    try {
      const { boardId, id } = params;
      const task = await this.tasksService.findOne(boardId, id);
      if (task) {
        return task;
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params) {
    const { boardId, id } = params;
    try {
      await this.tasksService.remove(boardId, id);      
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
