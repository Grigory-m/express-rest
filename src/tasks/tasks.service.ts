import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async findAll(boardId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ boardId });
    return tasks;
  }

  async findOne(boardId: string, id: string): Promise<Task | void> {
    const task = await this.tasksRepository.findOne({ boardId, id });
    return task;
  }

  async create(dto: CreateTaskDto): Promise<Task | void> {
    let task = new Task();
    task = { id: task.id, ...dto };
    const newBoard = await this.tasksRepository.save(task);
    return newBoard;
  }

  async update(
    boardId: string,
    id: string,
    dto: UpdateTaskDto
  ): Promise<Task | void> {
    let updatedTask = await this.tasksRepository.findOne({ boardId, id });
    if (updatedTask) {
      updatedTask = { id: updatedTask.id, ...dto };
      await this.tasksRepository.save(updatedTask);
    }
    return updatedTask;
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.tasksRepository.delete({ boardId, id });
  }
}
