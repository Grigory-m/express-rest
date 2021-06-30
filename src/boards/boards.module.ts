import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { Task } from '../tasks/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Board, Task]), TasksModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
