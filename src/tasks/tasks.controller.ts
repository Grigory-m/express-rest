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
  @HttpCode(HttpStatus.OK)
  async findOne(@Param() params): Promise<Task | void> {
    const { boardId, id } = params;
    const task = await this.tasksService.findOne(boardId, id);
    return task;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task | void> {
    const task = await this.tasksService.create(createTaskDto);
    return task;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() params,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task | void> {
    const { boardId, id } = params;
    const task = await this.tasksService.update(boardId, id, updateTaskDto);
    return task;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params) {
    const { boardId, id } = params;
    await this.tasksService.remove(boardId, id);
    return null;
  }
}
