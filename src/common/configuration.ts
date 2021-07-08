import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/**/migration/*{.ts,.js}`],
  cli: {
    migrationsDir: `src/migration`,
  },
  synchronize: true,
  migrationsRun: true,
});
