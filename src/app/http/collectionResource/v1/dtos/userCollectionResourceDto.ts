import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import { ResourceIdApiProperty, CollectionIdApiProperty, CollectionResourceIdApiProperty } from '../docs/properties';

export class CollectionResourceV1Dto {
  @Expose()
  @CollectionResourceIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: Date;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @Expose()
  @ResourceIdApiProperty()
  public resourceId: string;

  @Expose()
  @CollectionIdApiProperty()
  public collectionId: string;
}
