import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

import { UserResourceUrlApiProperty, UserIdApiProperty } from '../docs/properties';
import { UserResourceV1Dto } from './userResourceDto';

export class CreateUserResourceBodyV1Dto {
  @IsString()
  @UserResourceUrlApiProperty()
  public readonly url: string;
}

export class CreateUserResourceQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateUserResourceResponseV1Dto {
  @ApiProperty({
    description: 'Created user resource.',
    type: UserResourceV1Dto,
  })
  public readonly userResource: UserResourceV1Dto;
}
