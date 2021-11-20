import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsUUID, IsString } from 'class-validator';

import {
  UserResourceTitleApiProperty,
  UserResourceContentApiProperty,
  UserResourceThumbnailUrlApiProperty,
  UserIdApiProperty,
  ResourceIdApiProperty,
} from '../docs/properties';
import { UserResourceV1Dto } from './userResourceDto';

export class UpdateUserResourceBodyV1Dto {
  @Expose()
  @IsString()
  @IsOptional()
  @UserResourceTitleApiProperty()
  public readonly title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @UserResourceThumbnailUrlApiProperty()
  public readonly thumbnailUrl?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @UserResourceContentApiProperty()
  public readonly content?: string;
}

export class UpdateUserResourceParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;
}

export class UpdateUserResourceQueriesV1Dto {
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
