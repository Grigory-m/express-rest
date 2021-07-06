import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/**/migration/*{.ts,.js}`],
  cli: {
    migrationsDir: `src/migration`,
  },
  synchronize: true,
  migrationsRun: true  
});
