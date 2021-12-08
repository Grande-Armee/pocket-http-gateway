import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import { ResourceIdApiProperty, CollectionIdApiProperty, CollectionResourceIdApiProperty } from '../docs/properties';

export class CollectionResourceV1Dto {
  @CollectionResourceIdApiProperty()
  public id: string;

  @CreatedAtApiProperty()
  public createdAt: Date;

  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @ResourceIdApiProperty()
  public resourceId: string;

  @CollectionIdApiProperty()
  public collectionId: string;
}
