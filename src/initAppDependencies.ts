import { LoggerService } from '@grande-armee/pocket-common';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { setupCors } from './setup/setupCors';
import { setupDocs } from './setup/setupDocs';
import { setupHttpVersioning } from './setup/setupHttpVersioning';
import { setupSecurity } from './setup/setupSecurity';
import { setupTraceIdHook } from './setup/setupTraceIdHook';

export const initAppDependencies = async (app: INestApplication): Promise<INestApplication> => {
  const httpAdapter = app.getHttpAdapter() as any as FastifyAdapter;
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

  return app;
};
