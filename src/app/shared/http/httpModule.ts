import { Module } from '@nestjs/common';

import { httpConfigProvider } from './providers/httpConfig';

@Module({
  providers: [httpConfigProvider],
  exports: [httpConfigProvider],
})
export class HttpModule {}
