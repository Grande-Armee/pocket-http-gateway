import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { UserEmailApiProperty } from '../docs/properties';

export class ResetPasswordBodyV1Dto {
  @IsEmail()
  @Expose()
  @UserEmailApiProperty()
  public readonly email: string;
}
