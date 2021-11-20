import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

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
  @UserResourceTitleApiProperty()
  public readonly title: string | null;

  @Expose()
  @UserResourceThumbnailUrlApiProperty()
  public readonly thumbnailUrl: string | null;

  @Expose()
  @UserResourceContentApiProperty()
  public readonly content: string | null;
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
