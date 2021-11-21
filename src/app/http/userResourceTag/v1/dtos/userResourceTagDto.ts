import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  UserIdApiProperty,
  ResourceIdApiProperty,
  TagIdApiProperty,
  UserResourceTagIdApiProperty,
} from '../docs/properties';

export class UserResourceTagV1Dto {
  @Expose()
  @UserResourceTagIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: string;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: string;

  @Expose()
  @UserIdApiProperty()
  public userId: string;

  @Expose()
  @ResourceIdApiProperty()
  public resourceId: string;

  @Expose()
  @TagIdApiProperty()
  public tagId: string;
}
