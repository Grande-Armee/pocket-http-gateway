import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsUUID, IsString } from 'class-validator';

import {
  CollectionTitleApiProperty,
  CollectionContentApiProperty,
  CollectionThumbnailUrlApiProperty,
  UserIdApiProperty,
  CollectionIdApiProperty,
} from '../docs/properties';
import { CollectionV1Dto } from './collectionDto';

export class UpdateCollectionBodyV1Dto {
  @Expose()
  @IsString()
  @IsOptional()
  @CollectionTitleApiProperty()
  public readonly title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @CollectionThumbnailUrlApiProperty()
  public readonly thumbnailUrl?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @CollectionContentApiProperty()
  public readonly content?: string;
}

export class UpdateCollectionParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class UpdateCollectionQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class UpdateCollectionResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Updated collection.',
    type: CollectionV1Dto,
  })
  public readonly collection: CollectionV1Dto;
}
