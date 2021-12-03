import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  CollectionIdApiProperty,
  CollectionTitleApiProperty,
  CollectionThumbnailUrlApiProperty,
  CollectionContentApiProperty,
} from '../docs/properties';

export class CollectionV1Dto {
  @CollectionIdApiProperty()
  public id: string;

  @CreatedAtApiProperty()
  public createdAt: Date;

  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @CollectionTitleApiProperty()
  public title: string | null;

  @CollectionThumbnailUrlApiProperty()
  public thumbnailUrl: string | null;

  @CollectionContentApiProperty()
  public content: string | null;
}
