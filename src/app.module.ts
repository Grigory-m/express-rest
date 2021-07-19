import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import configuration from './common/configuration';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: configuration,
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoggerModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
