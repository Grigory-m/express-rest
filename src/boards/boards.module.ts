import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { Task } from '../tasks/task.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Task]),
    TasksModule,
    JwtModule.register({
      secret: `${process.env['JWT_SECRET_KEY']}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
