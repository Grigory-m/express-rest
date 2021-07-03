export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  secret_key: process.env.JWT_SECRET_KEY,
  database: {
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
  },
});
