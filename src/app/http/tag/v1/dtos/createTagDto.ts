import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { TagColorApiProperty, TagTitleApiProperty, UserIdApiProperty } from '../docs/properties';
import { TagV1Dto } from './tagDto';

export class CreateTagBodyV1Dto {
  @IsString()
  @Expose()
  @TagColorApiProperty()
  public readonly color: string;

  @IsString()
  @Expose()
  @TagTitleApiProperty()
  public readonly title: string;
}

export class CreateTagQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateTagResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Created tag.',
    type: TagV1Dto,
  })
  public readonly tag: TagV1Dto;
}
