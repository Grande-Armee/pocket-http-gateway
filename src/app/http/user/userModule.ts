import { Module } from '@nestjs/common';

import { UserV1Controller } from './v1/controllers/user/userController';
import { UserV1Service } from './v1/services/user/userService';

@Module({
  controllers: [UserV1Controller],
  providers: [UserV1Service],
})
export class UserModule {}
