import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty, CollectionIdApiProperty } from '../docs/properties';

export class RemoveCollectionResourceParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @Expose()
  @CollectionIdApiProperty()
  public readonly collectionId: string;
}

export class RemoveCollectionResourceQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}
