import './pathAliases';

import { LoggerService } from '@grande-armee/pocket-common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app/appModule';
import { HttpConfig, HTTP_CONFIG } from './app/http/providers/httpConfig';
import { setupCors } from './setup/setupCors';
import { setupDocs } from './setup/setupDocs';
import { setupHttpVersioning } from './setup/setupHttpVersioning';
import { setupSecurity } from './setup/setupSecurity';
import { setupTraceIdHook } from './setup/setupTraceIdHook';

async function bootstrap(): Promise<void> {
  const httpAdapter = new FastifyAdapter();

  const app = await NestFactory.create(AppModule, httpAdapter, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);

  app.useLogger(logger);
  app.flushLogs();

  await setupCors(app);
  await setupSecurity(app, httpAdapter);
  await setupHttpVersioning(app);
  await setupTraceIdHook(app, httpAdapter);
  await setupDocs(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      disableErrorMessages: false,
    }),
  );

  const { host, port } = app.get<HttpConfig>(HTTP_CONFIG);

  await app.listen(port, host);

  logger.info('HTTP server successfully started.', { port, host });
}

bootstrap();
