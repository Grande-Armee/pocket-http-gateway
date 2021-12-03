import { UserResourceStatus } from '@grande-armee/pocket-common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum, IsNumber, IsBoolean } from 'class-validator';

import {
  UserResourceStatusApiProperty,
  ResourceIdApiProperty,
  UserResourceIsFavoriteApiProperty,
  UserResourceRatingApiProperty,
  UserIdApiProperty,
} from '../docs/properties';
import { UserResourceV1Dto } from './userResourceDto';

export class UpdateUserResourceBodyV1Dto {
  @IsEnum(UserResourceStatus)
  @IsOptional()
  @UserResourceStatusApiProperty()
  public status?: UserResourceStatus;

  @IsBoolean()
  @IsOptional()
  @UserResourceIsFavoriteApiProperty()
  public isFavorite?: boolean;

  @IsNumber()
  @IsOptional()
  @UserResourceRatingApiProperty()
  public rating?: number;
}

export class UpdateUserResourceParamsV1Dto {
  @IsUUID('4')
  @ResourceIdApiProperty()
  public readonly resourceId: string;
}

export class UpdateUserResourceQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class UpdateUserResourceResponseV1Dto {
  @ApiProperty({
    description: 'Updated user resource.',
    type: UserResourceV1Dto,
  })
  public readonly userResource: UserResourceV1Dto;
}
