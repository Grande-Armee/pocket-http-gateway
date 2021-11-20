import { Module } from '@nestjs/common';

import { AuthModule } from './auth/authModule';
import { httpConfigProvider } from './providers/httpConfig';
import { UserModule } from './user/userModule';
import { UserResourceModule } from './userResource/userResourceModule';

@Module({
  imports: [UserModule, AuthModule, UserResourceModule],
  providers: [httpConfigProvider],
  exports: [httpConfigProvider, UserModule, AuthModule, UserResourceModule],
})
export class HttpModule {}
