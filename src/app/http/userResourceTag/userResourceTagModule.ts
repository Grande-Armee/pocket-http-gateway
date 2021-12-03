import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserResourceTagV1Controller } from './v1/controllers/userResourceTag/userResourceTagController';

@Module({
  imports: [AuthModule],
  controllers: [UserResourceTagV1Controller],
})
export class UserResourceTagModule {}
