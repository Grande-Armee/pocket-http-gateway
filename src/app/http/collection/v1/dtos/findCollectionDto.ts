import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, CollectionIdApiProperty } from '../docs/properties';
import { CollectionV1Dto } from './collectionDto';

export class FindCollectionParamsV1Dto {
  @IsUUID('4')
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class FindCollectionQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class FindCollectionResponseV1Dto {
  @ApiProperty({
    description: 'Found collection.',
    type: CollectionV1Dto,
  })
  public readonly collection: CollectionV1Dto;
}
