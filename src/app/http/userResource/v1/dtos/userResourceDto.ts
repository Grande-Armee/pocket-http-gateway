import { ResourceDto, TagDto, UserResourceStatus } from '@grande-armee/pocket-common';
import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';
import { ResourceIdApiProperty } from '@src/app/http/collection/v1/docs/properties';

import {
  UserIdApiProperty,
  UserResourceIdApiProperty,
  UserResourceRatingApiProperty,
  UserResourceResourceApiProperty,
  UserResourceStatusApiProperty,
  UserResourceTagsApiProperty,
} from '../docs/properties';

export class UserResourceV1Dto {
  @Expose()
  @UserResourceIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: Date;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @Expose()
  @UserResourceStatusApiProperty()
  public status: UserResourceStatus;

  @Expose()
  @UserResourceStatusApiProperty()
  public isFavorite: boolean;

  @Expose()
  @UserResourceRatingApiProperty()
  public rating: number | null;

  @Expose()
  @UserResourceResourceApiProperty()
  public resource: ResourceDto | null;

  @Expose()
  @ResourceIdApiProperty()
  public resourceId: string;

  @Expose()
  @UserIdApiProperty()
  public userId: string;

  @Expose()
  @UserResourceTagsApiProperty()
  public tags: TagDto[] | null;
}
