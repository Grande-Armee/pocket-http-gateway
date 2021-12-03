import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserResourceV1Controller } from './v1/controllers/userResource/userResourceController';

@Module({
  imports: [AuthModule],
  controllers: [UserResourceV1Controller],
})
export class UserResourceModule {}
