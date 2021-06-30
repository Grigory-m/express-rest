import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env['TYPEORM_HOST'],
        port: parseInt(process.env['TYPEORM_PORT']) || 5432,
        username: process.env['TYPEORM_USERNAME'],
        password: process.env['TYPEORM_PASSWORD'],
        database: process.env['TYPEORM_DATABASE'],
        entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
        migrations: [join(__dirname + '/**/migration/*{.ts,.js}')],
        cli: {
          migrationsDir: `${join(__dirname + '/**/migration')}`
        },
        synchronize: false,
        migrationsRun: true
      })
    }),
    UsersModule,
    BoardsModule
  ]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
