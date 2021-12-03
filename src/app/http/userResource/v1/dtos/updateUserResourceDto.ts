import { UserResourceStatus } from '@grande-armee/pocket-common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
  @Expose()
  @IsEnum(UserResourceStatus)
  @IsOptional()
  @UserResourceStatusApiProperty()
  public status?: UserResourceStatus;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @UserResourceIsFavoriteApiProperty()
  public isFavorite?: boolean;

  @Expose()
  @IsNumber()
  @IsOptional()
  @UserResourceRatingApiProperty()
  public rating?: number;
}

export class UpdateUserResourceParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;
}

export class UpdateUserResourceQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class UpdateUserResourceResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Updated user resource.',
    type: UserResourceV1Dto,
  })
  public readonly userResource: UserResourceV1Dto;
}
