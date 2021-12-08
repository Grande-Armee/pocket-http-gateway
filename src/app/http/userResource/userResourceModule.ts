import { ResourceTransporter, UserResourceTransporter } from '@grande-armee/pocket-common';
import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserResourceV1Controller } from './v1/controllers/userResource/userResourceController';

@Module({
  providers: [ResourceTransporter, UserResourceTransporter],
  imports: [AuthModule],
  controllers: [UserResourceV1Controller],
})
export class UserResourceModule {}
