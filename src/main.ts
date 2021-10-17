import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { fastifyHelmet as helmet } from 'fastify-helmet';

import { AppModule } from './app/app';

async function bootstrap(): Promise<void> {
  const httpAdapter = new FastifyAdapter();

  const app = await NestFactory.create(AppModule, httpAdapter, {
    bufferLogs: true,
  });

  app.enableCors();

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  await httpAdapter.register(helmet);

  // TODO: separate file
  const config = new DocumentBuilder()
    .setTitle('Pocket')
    .setDescription('The Pocket HTTP API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    staticCSP: {
      'script-src': `'self' 'unsafe-inline'`,
    },
  });

  // TODO: config
  await app.listen(Number(process.env.HTTP_PORT), String(process.env.HTTP_HOST));
}

bootstrap();
