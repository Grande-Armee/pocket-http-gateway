import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, ResourceIdApiProperty } from '../docs/properties';

export class RemoveUserResourceParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @ResourceIdApiProperty()
  public readonly resourceId: string;
}

export class RemoveUserResourceQueriesV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}
