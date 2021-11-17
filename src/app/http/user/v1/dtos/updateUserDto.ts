import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

import { UserEmailApiProperty, UserIdApiProperty, UserPasswordApiProperty } from '../docs/properties';
import { UserV1Dto } from './userDto';

export class UpdateUserBodyV1Dto {
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

export class UpdateUserParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class UpdateUserResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
