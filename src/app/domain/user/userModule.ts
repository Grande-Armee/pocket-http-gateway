import { Module } from '@nestjs/common';

import { UserV1Controller } from './controllers/userV1/userV1Controller';
import { UserV1Service } from './services/userV1/userV1Service';

@Module({
  imports: [],
  controllers: [UserV1Controller],
  providers: [UserV1Service],
})
export class UserModule {}
