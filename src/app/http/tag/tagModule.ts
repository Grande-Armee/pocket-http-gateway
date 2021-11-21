import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { TagV1Controller } from './v1/controllers/tag/tagController';
import { TagV1Service } from './v1/services/tag/tagService';

@Module({
  imports: [AuthModule],
  controllers: [TagV1Controller],
  providers: [TagV1Service],
})
export class TagModule {}
