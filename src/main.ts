import './pathAliases';

import { LoggerService } from '@grande-armee/pocket-common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app/appModule';
import { HttpConfig, HTTP_CONFIG } from './app/http/providers/httpConfig';
import { initAppDependencies } from './initAppDependencies';

async function bootstrap(): Promise<void> {
  const httpAdapter = new FastifyAdapter();

  const app = await NestFactory.create(AppModule, httpAdapter, {
    bufferLogs: true,
  });

  await initAppDependencies(app);

  const logger = app.get(LoggerService);

  const { host, port } = app.get<HttpConfig>(HTTP_CONFIG);

  await app.listen(port, host);

  logger.info('HTTP server successfully started.', { port, host });
}

bootstrap();
