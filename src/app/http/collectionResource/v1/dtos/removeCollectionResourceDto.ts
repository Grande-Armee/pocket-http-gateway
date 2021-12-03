import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty, CollectionIdApiProperty } from '../docs/properties';

export class RemoveCollectionResourceParamsV1Dto {
  @IsUUID('4')
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class RemoveCollectionResourceQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}
