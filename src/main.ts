import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

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

  await app.listen(PORT);
}
bootstrap();
