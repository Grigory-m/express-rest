import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({
      secret: `${process.env['JWT_SECRET_KEY']}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
