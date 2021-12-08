import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

import { UserIdApiProperty, CollectionTitleApiProperty } from '../docs/properties';
import { CollectionV1Dto } from './collectionDto';

export class CreateCollectionQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;

  @IsString()
  @CollectionTitleApiProperty()
  public readonly title: string;
}

export class CreateCollectionResponseV1Dto {
  @ApiProperty({
    description: 'Created collection.',
    type: CollectionV1Dto,
  })
  public readonly collection: CollectionV1Dto;
}
