import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, CollectionIdApiProperty } from '../docs/properties';
import { CollectionV1Dto } from './collectionDto';

export class FindCollectionParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class FindCollectionQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class FindCollectionResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Found collection.',
    type: CollectionV1Dto,
  })
  public readonly collection: CollectionV1Dto;
}
