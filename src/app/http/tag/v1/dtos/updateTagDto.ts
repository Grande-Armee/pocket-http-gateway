import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsString } from 'class-validator';

import { TagColorApiProperty, TagTitleApiProperty, UserIdApiProperty, TagIdApiProperty } from '../docs/properties';
import { TagV1Dto } from './tagDto';

export class UpdateTagBodyV1Dto {
  @IsString()
  @IsOptional()
  @TagColorApiProperty()
  public readonly color?: string;

  @IsString()
  @IsOptional()
  @TagTitleApiProperty()
  public readonly title?: string;
}

export class UpdateTagParamsV1Dto {
  @IsUUID('4')
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class UpdateTagQueryV1Dto {
  @IsUUID('4')
  @UserIdApiProperty()
  public readonly userId: string;
}

export class UpdateTagResponseV1Dto {
  @ApiProperty({
    description: 'Updated tag.',
    type: TagV1Dto,
  })
  public readonly tag: TagV1Dto;
}
