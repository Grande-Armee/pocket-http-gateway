import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID, IsString } from 'class-validator';

import { UserIdApiProperty, CollectionTitleApiProperty } from '../docs/properties';
import { CollectionV1Dto } from './collectionDto';

export class CreateCollectionQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;

  @IsString()
  @Expose()
  @CollectionTitleApiProperty()
  public readonly title: string;
}

export class CreateCollectionResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created collection.',
    type: CollectionV1Dto,
  })
  public readonly collection: CollectionV1Dto;
}
