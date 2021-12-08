import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { CollectionIdApiProperty, UserIdApiProperty, ResourceIdApiProperty } from '../docs/properties';
import { CollectionResourceV1Dto } from './userCollectionResourceDto';

export class CreateCollectionResourceParamsV1Dto {
  @IsUUID('4')
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class CreateCollectionResourceQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateCollectionResourceResponseV1Dto {
  @ApiProperty({
    description: 'Created collection resource.',
    type: CollectionResourceV1Dto,
  })
  public readonly collectionResource: CollectionResourceV1Dto;
}
