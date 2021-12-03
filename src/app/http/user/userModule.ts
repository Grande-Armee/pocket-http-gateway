import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserV1Controller } from './v1/controllers/user/userController';

@Module({
  imports: [AuthModule],
  controllers: [UserV1Controller],
})
export class UserModule {}
