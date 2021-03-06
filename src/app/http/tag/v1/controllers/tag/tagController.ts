import { DtoFactory, TagTransporter } from '@grande-armee/pocket-common';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { BearerTokenPayload } from '@http/auth/decorators/authTokenPayload/authTokenPayloadDecorator';
import { BearerTokenGuard } from '@http/auth/guards/bearerToken/bearerTokenGuard';
import { AuthPayload } from '@http/auth/interfaces';

import { CreateTagBodyV1Dto, CreateTagResponseV1Dto, CreateTagQueryV1Dto } from '../../dtos/createTagDto';
import { RemoveTagParamsV1Dto, RemoveTagQueryV1Dto } from '../../dtos/removeTagDto';
import {
  UpdateTagBodyV1Dto,
  UpdateTagParamsV1Dto,
  UpdateTagResponseV1Dto,
  UpdateTagQueryV1Dto,
} from '../../dtos/updateTagDto';

@ApiTags('Tags')
@Controller({ version: '1', path: '/tags' })
export class TagV1Controller {
  public constructor(private readonly tagTransporter: TagTransporter, private readonly dtoFactory: DtoFactory) {}

  @ApiOperation({
    description: 'Create tag.',
  })
  @ApiCreatedResponse({
    description: 'Tag created.',
    type: CreateTagResponseV1Dto,
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createTag(
    @Query() createTagQuery: CreateTagQueryV1Dto,
    @Body() createTagBody: CreateTagBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<CreateTagResponseV1Dto> {
    const { userId } = createTagQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { color, title } = createTagBody;

    const result = await this.tagTransporter.createTag({
      userId,
      color,
      title,
    });

    return this.dtoFactory.create(CreateTagResponseV1Dto, {
      tag: {
        id: result.tag.id,
        createdAt: result.tag.createdAt,
        updatedAt: result.tag.updatedAt,
        color: result.tag.color,
        title: result.tag.title,
        userId: result.tag.userId,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update tag by id.',
  })
  @ApiOkResponse({
    description: 'Tag updated.',
    type: UpdateTagResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':tagId')
  public async updateTag(
    @Param() updateTagParams: UpdateTagParamsV1Dto,
    @Query() updateTagQuery: UpdateTagQueryV1Dto,
    @Body() updateTagBody: UpdateTagBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<UpdateTagResponseV1Dto> {
    const { tagId } = updateTagParams;

    const { userId } = updateTagQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { title, color } = updateTagBody;

    const result = await this.tagTransporter.updateTag({
      tagId,
      title,
      color,
    });

    return this.dtoFactory.create(CreateTagResponseV1Dto, {
      tag: {
        id: result.tag.id,
        createdAt: result.tag.createdAt,
        updatedAt: result.tag.updatedAt,
        color: result.tag.color,
        title: result.tag.title,
        userId: result.tag.userId,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove tag by id.',
  })
  @ApiNoContentResponse({
    description: 'Tag removed.',
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':tagId')
  public async removeTag(
    @Param() removeTagParams: RemoveTagParamsV1Dto,
    @Query() removeTagQuery: RemoveTagQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { tagId } = removeTagParams;

    const { userId } = removeTagQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    await this.tagTransporter.removeTag({
      tagId,
    });
  }
}
