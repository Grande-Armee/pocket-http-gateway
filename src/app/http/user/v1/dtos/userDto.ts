import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import {
  UserEmailApiProperty,
  UserIdApiProperty,
  UserIsActiveApiProperty,
  UserLanguageApiProperty,
  UserRoleApiProperty,
} from '../docs/properties';

export class UserV1Dto {
  @Expose()
  @UserIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: string;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: string;

  @Expose()
  @UserEmailApiProperty()
  public email: string;

  @Expose()
  @UserRoleApiProperty()
  public role: string;

  @Expose()
  @UserLanguageApiProperty()
  public language: string;

  @Expose()
  @UserIsActiveApiProperty()
  public isActive: boolean;
}
