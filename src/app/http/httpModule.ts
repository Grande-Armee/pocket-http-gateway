import { Module } from '@nestjs/common';

import { AuthModule } from './auth/authModule';
import { httpConfigProvider } from './providers/httpConfig';
import { UserModule } from './user/userModule';

@Module({
  imports: [UserModule, AuthModule],
  providers: [httpConfigProvider],
  exports: [httpConfigProvider, UserModule, AuthModule],
})
export class HttpModule {}
