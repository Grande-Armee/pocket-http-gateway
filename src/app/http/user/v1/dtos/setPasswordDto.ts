import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

import { UserPasswordApiProperty } from '../docs/properties';

export class SetPasswordBodyV1Dto {
  @IsString()
  @MinLength(12)
  @Expose()
  @UserPasswordApiProperty()
  public readonly password: string;
}
