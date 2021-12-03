import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { CollectionResourceV1Controller } from './v1/controllers/collectionResource/collectionResourceController';

@Module({
  imports: [AuthModule],
  controllers: [CollectionResourceV1Controller],
})
export class CollectionResourceModule {}
