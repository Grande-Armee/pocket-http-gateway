import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  UserEmailApiProperty,
  UserIdApiProperty,
  UserLanguageApiProperty,
  UserRoleApiProperty,
} from '../docs/properties';

export class UserV1Dto {
  @Expose()
  @UserIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: Date;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @Expose()
  @UserEmailApiProperty()
  public email: string;

  @Expose()
  @UserRoleApiProperty()
  public role: string;

  @Expose()
  @UserLanguageApiProperty()
  public language: string;
}
