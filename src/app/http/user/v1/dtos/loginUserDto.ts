import { IsEmail, IsString, MinLength } from 'class-validator';

import { UserEmailApiProperty, UserPasswordApiProperty, UserTokenApiProperty } from '../docs/properties';

export class LoginUserBodyV1Dto {
  @IsEmail()
  @UserEmailApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(12)
  @UserPasswordApiProperty()
  public readonly password: string;
}

export class LoginUserResponseV1Dto {
  @IsString()
  @UserTokenApiProperty()
  public readonly token: string;
}
