import { Module } from '@nestjs/common';

import { AuthModule } from './auth/authModule';
import { httpConfigProvider } from './providers/httpConfig';
import { TagModule } from './tag/tagModule';
import { UserModule } from './user/userModule';
import { UserResourceModule } from './userResource/userResourceModule';

@Module({
  imports: [UserModule, AuthModule, UserResourceModule, TagModule],
  providers: [httpConfigProvider],
  exports: [httpConfigProvider, UserModule, AuthModule, UserResourceModule, TagModule],
})
export class HttpModule {}
