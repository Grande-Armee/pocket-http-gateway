import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

import { TagColorApiProperty, TagTitleApiProperty, UserIdApiProperty } from '../docs/properties';
import { TagV1Dto } from './tagDto';

export class CreateTagBodyV1Dto {
  @IsString()
  @TagColorApiProperty()
  public readonly color: string;

  @IsString()
  @TagTitleApiProperty()
  public readonly title: string;
}

export class CreateTagQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class CreateTagResponseV1Dto {
  @ApiProperty({
    description: 'Created tag.',
    type: TagV1Dto,
  })
  public readonly tag: TagV1Dto;
}
