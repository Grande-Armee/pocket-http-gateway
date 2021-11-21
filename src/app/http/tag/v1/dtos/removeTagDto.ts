import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { UserIdApiProperty, TagIdApiProperty } from '../docs/properties';

export class RemoveTagParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class RemoveTagQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}
