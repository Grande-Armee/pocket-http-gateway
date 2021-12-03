import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { CollectionV1Controller } from './v1/controllers/collection/collectionController';

@Module({
  imports: [AuthModule],
  controllers: [CollectionV1Controller],
})
export class CollectionModule {}
