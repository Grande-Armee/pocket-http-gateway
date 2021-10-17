import { Module } from '@nestjs/common';

import { UserV1Controller } from './controllers/user-v1';
import { UserService } from './services/user';

@Module({
  controllers: [UserV1Controller],
  providers: [UserService],
})
export class UserModule {}
