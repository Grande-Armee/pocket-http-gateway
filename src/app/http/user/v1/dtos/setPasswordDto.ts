import { Expose } from 'class-transformer';
import { IsString, MinLength, IsUUID } from 'class-validator';

import { UserPasswordApiProperty, UserIdApiProperty } from '../docs/properties';

export class SetPasswordBodyV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;

  @IsString()
  @MinLength(12)
  @Expose()
  @UserPasswordApiProperty()
  public readonly password: string;
}
