import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  UserIdApiProperty,
  ResourceIdApiProperty,
  TagIdApiProperty,
  UserResourceTagIdApiProperty,
} from '../docs/properties';

export class UserResourceTagV1Dto {
  @UserResourceTagIdApiProperty()
  public id: string;

  @CreatedAtApiProperty()
  public createdAt: string;

  @UpdatedAtApiProperty()
  public updatedAt: string;

  @UserIdApiProperty()
  public userId: string;

  @ResourceIdApiProperty()
  public resourceId: string;

  @TagIdApiProperty()
  public tagId: string;
}
