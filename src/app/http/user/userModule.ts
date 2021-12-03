import { UserTransporter } from '@grande-armee/pocket-common';
import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { UserV1Controller } from './v1/controllers/user/userController';

@Module({
  providers: [UserTransporter],
  imports: [AuthModule],
  controllers: [UserV1Controller],
})
export class UserModule {}
