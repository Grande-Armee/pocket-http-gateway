import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty } from '../docs/properties';
import { UserV1Dto } from './userDto';

export class FindUserParamsV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class FindUserResponseV1Dto {
  @ApiProperty({
    description: 'Found user.',
    type: UserV1Dto,
  })
  public readonly user: UserV1Dto;
}
