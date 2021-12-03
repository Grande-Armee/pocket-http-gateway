import { UserLanguage } from '@grande-armee/pocket-common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

import { UserEmailApiProperty, UserPasswordApiProperty, UserLanguageApiProperty } from '../docs/properties';
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

  @IsEnum(UserLanguage)
  @MinLength(12)
  @Expose()
  @UserLanguageApiProperty()
  public readonly language: UserLanguage;
}

export class CreateUserResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
