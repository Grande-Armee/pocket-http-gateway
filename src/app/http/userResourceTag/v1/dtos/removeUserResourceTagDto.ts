import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty, TagIdApiProperty } from '../docs/properties';

export class RemoveUserResourceTagParamsV1Dto {
  @IsUUID('4')
  @ResourceIdApiProperty()
  public readonly resourceId: string;

  @IsUUID('4')
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class RemoveUserResourceTagQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}
