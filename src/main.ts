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

async function bootstrap() {
  const service = new ConfigService();
  const fastify = service.get<string>('USE_FASTIFY');
  const PORT = service.get<number>('PORT');
  let app: INestApplication;

  if (fastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule);
  }
  const document = yamljs.load(`${__dirname}/../doc/api.yaml`);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
