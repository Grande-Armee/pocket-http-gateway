import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { UserIdApiProperty, UserLanguageApiProperty } from '../docs/properties';
import { UserV1Dto } from './userDto';

export class UpdateUserBodyV1Dto {
  @IsString()
  @Expose()
  @UserLanguageApiProperty()
  public readonly language: string;
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
    description: 'Updated user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
