import { Module } from '@nestjs/common';

import { httpConfigProvider } from './providers/httpConfig';
import { UserModule } from './user/userModule';

@Module({
  imports: [UserModule],
  providers: [httpConfigProvider],
  exports: [httpConfigProvider, UserModule],
})
export class HttpModule {}
