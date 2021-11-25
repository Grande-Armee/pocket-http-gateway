import { Module } from '@nestjs/common';

import { AuthModule } from '@http/auth/authModule';

import { CollectionResourceV1Controller } from './v1/controllers/collectionResource/collectionResourceController';
import { CollectionResourceV1Service } from './v1/services/collectionResource/collectionResourceService';

@Module({
  imports: [AuthModule],
  controllers: [CollectionResourceV1Controller],
  providers: [CollectionResourceV1Service],
})
export class CollectionResourceModule {}
