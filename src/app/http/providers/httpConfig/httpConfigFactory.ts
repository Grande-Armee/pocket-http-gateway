import { ConfigService, Joi } from '@grande-armee/pocket-common';

import { HttpConfig } from './interfaces';

export const httpConfigFactory = async (configService: ConfigService, joi: Joi): Promise<HttpConfig> => {
  return configService.validateConfig<HttpConfig>(
    (envVariables) => ({
      host: envVariables.HTTP_HOST,
      port: envVariables.HTTP_PORT,
    }),
    joi.object({
      host: joi.string().required(),
      port: joi.number().required(),
    }),
  );
};
