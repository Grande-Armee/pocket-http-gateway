import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty } from '../docs/properties';
import { UserResourceV1Dto } from './userResourceDto';

export class FindUserResourceParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;
}

export class FindUserResourceQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class FindUserResourceResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Found user resource.',
    type: UserResourceV1Dto,
  })
  public readonly userResource: UserResourceV1Dto;
}
