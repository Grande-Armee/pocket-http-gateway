import { ConfigService, JOI } from '@grande-armee/pocket-common';
import { Provider } from '@nestjs/common';

import { httpConfigFactory } from './httpConfigFactory';

export const HTTP_CONFIG = Symbol('HTTP_CONFIG');

export const httpConfigProvider: Provider = {
  provide: HTTP_CONFIG,
  useFactory: httpConfigFactory,
  inject: [ConfigService, JOI],
};
