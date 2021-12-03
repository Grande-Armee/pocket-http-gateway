import { UserLanguage } from '@grande-armee/pocket-common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

import { UserEmailApiProperty, UserPasswordApiProperty, UserLanguageApiProperty } from '../docs/properties';
import { UserV1Dto } from './userDto';

export class CreateUserBodyV1Dto {
  @IsEmail()
  @UserEmailApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(12)
  @UserPasswordApiProperty()
  public readonly password: string;

  @IsEnum(UserLanguage)
  @UserLanguageApiProperty()
  public readonly language: UserLanguage;
}

export class CreateUserResponseV1Dto {
  @ApiProperty({
    description: 'Created user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
