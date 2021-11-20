import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { UserResourceUrlApiProperty, UserIdApiProperty } from '../docs/properties';
import { UserResourceV1Dto } from './userResourceDto';

export class CreateUserResourceBodyV1Dto {
  @IsString()
  @Expose()
  @UserResourceUrlApiProperty()
  public readonly url: string;
}

export class CreateUserResourceQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateUserResourceResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user resource.',
    type: UserResourceV1Dto,
  })
  public readonly userResource: UserResourceV1Dto;
}
