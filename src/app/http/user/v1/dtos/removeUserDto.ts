import { IsUUID } from 'class-validator';

import { UserIdApiProperty } from '../docs/properties';

export class RemoveUserParamsV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}
