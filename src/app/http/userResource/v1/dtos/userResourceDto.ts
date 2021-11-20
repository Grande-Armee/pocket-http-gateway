import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  UserResourceIdApiProperty,
  UserResourceUrlApiProperty,
  UserResourceTitleApiProperty,
  UserResourceThumbnailUrlApiProperty,
  UserResourceContentApiProperty,
} from '../docs/properties';

export class UserResourceV1Dto {
  @Expose()
  @UserResourceIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: string;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: string;

  @Expose()
  @UserResourceUrlApiProperty()
  public url: string;

  @Expose()
  @UserResourceTitleApiProperty()
  public title: string | null;

  @Expose()
  @UserResourceThumbnailUrlApiProperty()
  public thumbnailUrl: string | null;

  @Expose()
  @UserResourceContentApiProperty()
  public content: string | null;
}
