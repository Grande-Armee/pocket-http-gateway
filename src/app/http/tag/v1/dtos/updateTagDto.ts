import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsUUID, IsString } from 'class-validator';

import { TagColorApiProperty, TagTitleApiProperty, UserIdApiProperty, TagIdApiProperty } from '../docs/properties';
import { TagV1Dto } from './tagDto';

export class UpdateTagBodyV1Dto {
  @IsString()
  @IsOptional()
  @Expose()
  @TagColorApiProperty()
  public readonly color?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @TagTitleApiProperty()
  public readonly title?: string;
}

export class UpdateTagParamsV1Dto {
  @IsUUID('4')
  @Expose()
  @TagIdApiProperty()
  public readonly tagId: string;
}

export class UpdateTagQueryV1Dto {
  @IsUUID('4')
  @Expose()
  @UserIdApiProperty()
  public readonly userId: string;
}

export class UpdateTagResponseV1Dto {
  @Expose()
  @ApiProperty({
    description: 'Updated tag.',
    type: TagV1Dto,
  })
  public readonly tag: TagV1Dto;
}
