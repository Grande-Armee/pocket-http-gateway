import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  UserEmailApiProperty,
  UserIdApiProperty,
  UserLanguageApiProperty,
  UserRoleApiProperty,
} from '../docs/properties';

export class UserV1Dto {
  @UserIdApiProperty()
  public id: string;

  @CreatedAtApiProperty()
  public createdAt: Date;

  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @UserEmailApiProperty()
  public email: string;

  @UserRoleApiProperty()
  public role: string;

  @UserLanguageApiProperty()
  public language: string;
}
