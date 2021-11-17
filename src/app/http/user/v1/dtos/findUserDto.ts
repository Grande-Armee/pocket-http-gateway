import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty } from '../docs/properties';
import { UserV1Dto } from './userDto';

export class FindUserParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class FindUserResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
