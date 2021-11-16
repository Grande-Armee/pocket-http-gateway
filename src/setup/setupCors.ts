import { INestApplication } from '@nestjs/common';

export const setupCors = async (app: INestApplication): Promise<INestApplication> => {
  app.enableCors();

  return app;
};
