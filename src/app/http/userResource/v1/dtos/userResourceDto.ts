import { ResourceDto, TagDto, UserResourceStatus } from '@grande-armee/pocket-common';

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
  @UserResourceIdApiProperty()
  public id: string;

  @CreatedAtApiProperty()
  public createdAt: Date;

  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @UserResourceStatusApiProperty()
  public status: UserResourceStatus;

  @UserResourceStatusApiProperty()
  public isFavorite: boolean;

  @UserResourceRatingApiProperty()
  public rating: number | null;

  @UserResourceResourceApiProperty()
  public resource: ResourceDto | null;

  @ResourceIdApiProperty()
  public resourceId: string;

  @UserIdApiProperty()
  public userId: string;

  @UserResourceTagsApiProperty()
  public tags: TagDto[] | null;
}
