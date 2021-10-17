import { Module } from '@nestjs/common';

import { UserModule } from './user/user';

@Module({
  imports: [UserModule],
})
export class AppModule {}
