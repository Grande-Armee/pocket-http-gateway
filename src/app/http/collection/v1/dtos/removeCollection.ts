import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, CollectionIdApiProperty } from '../docs/properties';

export class RemoveCollectionParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class RemoveCollectionQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}
