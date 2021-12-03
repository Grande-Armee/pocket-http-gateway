import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty } from '../docs/properties';

export class RemoveUserResourceParamsV1Dto {
  @IsUUID('4')
  @ResourceIdApiProperty()
  public readonly resourceId: string;
}

export class RemoveUserResourceQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}
