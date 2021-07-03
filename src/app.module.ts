import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT) || 5432,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/**/migration/*{.ts,.js}`],
        cli: {
          migrationsDir: `${__dirname}/**/migration`,
        },
        synchronize: false,
        migrationsRun: true,
      }),
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
