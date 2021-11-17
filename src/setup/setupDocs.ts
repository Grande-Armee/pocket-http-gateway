import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupDocs = async (app: INestApplication): Promise<INestApplication> => {
  const config = new DocumentBuilder()
    .setTitle('Pocket')
    .setDescription('The Pocket HTTP API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    staticCSP: {
      'script-src': `'self' 'unsafe-inline'`,
    },
  });

  return app;
};
