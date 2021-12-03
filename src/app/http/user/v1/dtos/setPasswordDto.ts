import { IsString, MinLength, IsUUID } from 'class-validator';

import { UserPasswordApiProperty, UserIdApiProperty } from '../docs/properties';

export class SetPasswordBodyV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;

  @IsString()
  @MinLength(12)
  @UserPasswordApiProperty()
  public readonly password: string;
}
