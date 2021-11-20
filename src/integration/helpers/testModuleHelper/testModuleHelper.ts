import { EnvVariables, ENV_VARIABLES } from '@grande-armee/pocket-common';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';

import { AppModule } from '@src/app/appModule';
import { initAppDependencies } from '@src/initAppDependencies';

export class TestModuleHelper {
  private builder: TestingModuleBuilder;

  public constructor() {
    this.builder = Test.createTestingModule({
      imports: [AppModule],
    });
  }

  public getBuilder(): TestingModuleBuilder {
    return this.builder;
  }

  public overrideEnvVariables(): TestModuleHelper {
    this.builder = this.builder.overrideProvider(ENV_VARIABLES).useValue({ ...this.getEnvVariables() });

    return this;
  }

  private getEnvVariables(): EnvVariables {
    return {
      LOGGER_SHOULD_PRETTIFY_LOGS: true,
      LOGGER_LOG_LEVEL: 'debug',
      RABBITMQ_URI: `amqp://username:password@rabbitmq:5672`,
      APP_NAME: `pocket-http-gateway`,
      HTTP_PORT: 3000,
      HTTP_HOST: '0.0.0.0',
    };
  }

  public static async createApp(moduleRef: TestingModule): Promise<INestApplication> {
    const httpAdapter = new FastifyAdapter();

    const app = moduleRef.createNestApplication(httpAdapter, {
      bufferLogs: true,
    });

    await initAppDependencies(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    return app;
  }

  public static createTestingModule(): TestingModuleBuilder {
    return new TestModuleHelper().overrideEnvVariables().getBuilder();
  }
}

// TODO: moduleRef
