import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import { UserIdApiProperty, TagIdApiProperty, TagColorApiProperty, TagTitleApiProperty } from '../docs/properties';

export class TagV1Dto {
  @TagIdApiProperty()
  public id: string;

  @CreatedAtApiProperty()
  public createdAt: Date;

  @UpdatedAtApiProperty()
  public updatedAt: Date;

  @TagColorApiProperty()
  public color: string | null;

  @TagTitleApiProperty()
  public title: string | null;

  @UserIdApiProperty()
  public userId: string;
}
