import { IsEmail } from 'class-validator';

import { UserEmailApiProperty } from '../docs/properties';

export class ResetPasswordBodyV1Dto {
  @IsEmail()
  @UserEmailApiProperty()
  public readonly email: string;
}
