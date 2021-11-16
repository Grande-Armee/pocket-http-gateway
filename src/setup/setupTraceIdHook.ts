import { ClsContextService, TRACE_ID_KEY } from '@grande-armee/pocket-common';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { v4 } from 'uuid';

export const setupTraceIdHook = async (
  app: INestApplication,
  httpAdapter: FastifyAdapter,
): Promise<INestApplication> => {
  const clsContextService = app.get(ClsContextService);

  httpAdapter.getInstance().addHook('onRequest', (request, reply, done) => {
    const namespace = clsContextService.getNamespace();

    namespace.run(() => {
      clsContextService.set(TRACE_ID_KEY, v4());

      done();
    });
  });

  return app;
};
