import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { Task } from '../tasks/task.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { toResponse } from '../common/to_response';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async findAll(): Promise<IUser[]> {
    const users = await this.usersRepository.find();
    return users.map(toResponse);
  }

  async findOne(id: string): Promise<IUser | void> {
    const user = await this.usersRepository.findOne(id);
    return toResponse(user);
  }

  async create(dto: CreateUserDto): Promise<IUser | void> {
    let user = new User();
    const password = bcrypt.hashSync(dto.password, 10);
    user = { id: user.id, ...dto, password };
    const newUser = await this.usersRepository.save(user);
    return toResponse(newUser);
  }

  async update(id: string, dto: UpdateUserDto): Promise<IUser | void> {
    let updatedUser = await this.usersRepository.findOne(id);
    if (updatedUser) {
      updatedUser = { id: updatedUser.id, ...dto };
      await this.usersRepository.save(updatedUser);
    }
    return toResponse(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      await this.usersRepository.remove(user);
      const tasks = await this.tasksRepository.find({ userId: id });
      await Promise.all(
        tasks.map(async (task) => {
          const updatedTask = task;
          updatedTask.userId = null;
          const promise = await this.tasksRepository.save(updatedTask);
          return promise;
        })
      );
    }
  }
}
