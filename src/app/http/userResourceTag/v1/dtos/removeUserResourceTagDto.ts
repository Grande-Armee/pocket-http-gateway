import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty, TagIdApiProperty } from '../docs/properties';

export class RemoveUserResourceTagParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @Expose()
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class RemoveUserResourceTagQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}
