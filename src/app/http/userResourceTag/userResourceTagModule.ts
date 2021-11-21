import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserResourceTagV1Controller } from './v1/controllers/userResourceTag/userResourceTagController';
import { UserResourceTagV1Service } from './v1/services/userResourceTag/userResourceTagService';

@Module({
  imports: [AuthModule],
  controllers: [UserResourceTagV1Controller],
  providers: [UserResourceTagV1Service],
})
export class UserResourceTagModule {}
