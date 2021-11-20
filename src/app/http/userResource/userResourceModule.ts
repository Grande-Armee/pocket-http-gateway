import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserResourceV1Controller } from './v1/controllers/userResource/userResourceController';
import { UserResourceV1Service } from './v1/services/userResource/userResourceService';

@Module({
  imports: [AuthModule],
  controllers: [UserResourceV1Controller],
  providers: [UserResourceV1Service],
})
export class UserResourceModule {}
