import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { TagIdApiProperty, UserIdApiProperty, ResourceIdApiProperty } from '../docs/properties';
import { UserResourceTagV1Dto } from './userResourceTagDto';

export class CreateUserResourceTagParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @Expose()
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class CreateUserResourceTagQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateUserResourceTagResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created user resource tag.',
    type: UserResourceTagV1Dto,
  })
  public readonly userResourceTag: UserResourceTagV1Dto;
}
