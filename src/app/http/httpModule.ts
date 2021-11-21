import { Module } from '@nestjs/common';

import { AuthModule } from './auth/authModule';
import { httpConfigProvider } from './providers/httpConfig';
import { TagModule } from './tag/tagModule';
import { UserModule } from './user/userModule';
import { UserResourceModule } from './userResource/userResourceModule';
import { UserResourceTagModule } from './userResourceTag/userResourceTagModule';

@Module({
  imports: [UserModule, AuthModule, UserResourceModule, TagModule, UserResourceTagModule],
  providers: [httpConfigProvider],
  exports: [httpConfigProvider, UserModule, AuthModule, UserResourceModule, TagModule, UserResourceTagModule],
})
export class HttpModule {}
