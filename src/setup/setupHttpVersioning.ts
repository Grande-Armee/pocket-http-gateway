import { INestApplication, VersioningType } from '@nestjs/common';

export const setupHttpVersioning = async (app: INestApplication): Promise<INestApplication> => {
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  return app;
};
