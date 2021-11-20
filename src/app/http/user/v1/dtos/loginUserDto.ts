import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

import { UserEmailApiProperty, UserPasswordApiProperty, UserTokenApiProperty } from '../docs/properties';

export class LoginUserBodyV1Dto {
  @IsEmail()
  @Expose()
  @UserEmailApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(12)
  @Expose()
  @UserPasswordApiProperty()
  public readonly password: string;
}

export class LoginUserResponseV1Dto {
  @IsString()
  @Expose()
  @UserTokenApiProperty()
  public readonly token: string;
}
