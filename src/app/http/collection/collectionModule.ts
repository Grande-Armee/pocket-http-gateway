import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { CollectionV1Controller } from './v1/controllers/collection/collectionController';
import { CollectionV1Service } from './v1/services/collection/collectionService';

@Module({
  imports: [AuthModule],
  controllers: [CollectionV1Controller],
  providers: [CollectionV1Service],
})
export class CollectionModule {}
