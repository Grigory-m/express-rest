import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Task } from '../tasks/task.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task]),
    TasksModule,
    JwtModule.register({
      secret: `${process.env['JWT_SECRET_KEY']}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
