import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { TagV1Controller } from './v1/controllers/tag/tagController';

@Module({
  imports: [AuthModule],
  controllers: [TagV1Controller],
})
export class TagModule {}
