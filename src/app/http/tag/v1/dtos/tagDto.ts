import { Expose } from 'class-transformer';

import { CreatedAtApiProperty, UpdatedAtApiProperty } from '@shared/docs/properties';

import { UserIdApiProperty, TagIdApiProperty, TagColorApiProperty, TagTitleApiProperty } from '../docs/properties';

export class TagV1Dto {
  @Expose()
  @TagIdApiProperty()
  public id: string;

  @Expose()
  @CreatedAtApiProperty()
  public createdAt: string;

  @Expose()
  @UpdatedAtApiProperty()
  public updatedAt: string;

  @Expose()
  @TagColorApiProperty()
  public color: string | null;

  @Expose()
  @TagTitleApiProperty()
  public title: string | null;

  @Expose()
  @UserIdApiProperty()
  public userId: string;
}
