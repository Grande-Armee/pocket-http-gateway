import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { fastifyHelmet as helmet } from 'fastify-helmet';

export const setupSecurity = async (app: INestApplication, httpAdapter: FastifyAdapter): Promise<INestApplication> => {
  await httpAdapter.register(helmet);

  return app;
};
