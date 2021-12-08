import { IsUUID } from 'class-validator';

import { UserIdApiProperty, TagIdApiProperty } from '../docs/properties';

export class RemoveTagParamsV1Dto {
  @IsUUID('4')
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class RemoveTagQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}
