import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Task } from '../tasks/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), TasksModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
