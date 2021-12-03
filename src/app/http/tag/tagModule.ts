import { TagTransporter } from '@grande-armee/pocket-common';
import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { TagV1Controller } from './v1/controllers/tag/tagController';

@Module({
  providers: [TagTransporter],
  imports: [AuthModule],
  controllers: [TagV1Controller],
})
export class TagModule {}
