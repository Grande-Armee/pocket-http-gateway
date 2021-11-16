import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmptyObject, IsString, MinLength, ValidateNested } from 'class-validator';

import { UserEmailApiProperty, UserPasswordApiProperty } from '../docs/propertiesV1';
import { UserV1Dto } from './userV1Dto';

export class CreateUserDataV1Dto {
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

export class CreateUserBodyV1Dto {
  @ValidateNested()
  @Type(() => CreateUserDataV1Dto)
  @IsDefined()
  @IsNotEmptyObject()
  @Expose()
  @ApiProperty({
    description: `User's data.`,
    type: CreateUserDataV1Dto,
  })
  public readonly userData: CreateUserDataV1Dto;
}

export class CreateUserResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
