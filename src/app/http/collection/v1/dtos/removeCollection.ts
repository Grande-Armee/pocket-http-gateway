import { IsUUID } from 'class-validator';

import { UserIdApiProperty, CollectionIdApiProperty } from '../docs/properties';

export class RemoveCollectionParamsV1Dto {
  @IsUUID('4')
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class RemoveCollectionQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}
