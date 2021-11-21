import { Module } from '@nestjs/common';

import { AuthModule } from './auth/authModule';
import { httpConfigProvider } from './providers/httpConfig';
import { UserModule } from './user/userModule';
import { UserResourceModule } from './userResource/userResourceModule';
import { UserResourceTagModule } from './userResourceTag/userResourceTagModule';

@Module({
  imports: [UserModule, AuthModule, UserResourceModule, UserResourceTagModule],
  providers: [httpConfigProvider],
  exports: [httpConfigProvider, UserModule, AuthModule, UserResourceModule, UserResourceTagModule],
})
export class HttpModule {}
