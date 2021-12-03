import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  CollectionIdApiProperty,
  CollectionTitleApiProperty,
  CollectionThumbnailUrlApiProperty,
  CollectionContentApiProperty,
} from '../docs/properties';

export class CollectionV1Dto {
  @Expose()
  @CollectionIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: Date;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @Expose()
  @CollectionTitleApiProperty()
  public title: string | null;

  @Expose()
  @CollectionThumbnailUrlApiProperty()
  public thumbnailUrl: string | null;

  @Expose()
  @CollectionContentApiProperty()
  public content: string | null;
}
