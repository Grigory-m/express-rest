import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as yamljs from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import createAdmin from './common/create_user';

async function bootstrap() {
  const service = new ConfigService();
  const fastify = service.get<string>('USE_FASTIFY');
  const PORT = service.get<number>('PORT');
  const document = yamljs.load(`${__dirname}/../doc/api.yaml`);
  let app: INestApplication;

  if (fastify !== 'false') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule);
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}

bootstrap().then(async () => { await createAdmin(); });
