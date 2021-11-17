import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

import { UserEmailApiProperty, UserPasswordApiProperty } from '../docs/properties';
import { UserV1Dto } from './userDto';

export class CreateUserBodyV1Dto {
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

export class CreateUserResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
