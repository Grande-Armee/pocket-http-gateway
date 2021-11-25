import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { CollectionIdApiProperty, UserIdApiProperty, ResourceIdApiProperty } from '../docs/properties';
import { CollectionResourceV1Dto } from './userCollectionResourceDto';

export class CreateCollectionResourceParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @Expose()
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class CreateCollectionResourceQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateCollectionResourceResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created collection resource.',
    type: CollectionResourceV1Dto,
  })
  public readonly collectionResource: CollectionResourceV1Dto;
}
