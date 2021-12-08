import { CollectionTransporter, DtoFactory } from '@grande-armee/pocket-common';
import {
  Body,
  Controller,
  Delete,
  Get,
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

import { CreateCollectionResponseV1Dto, CreateCollectionQueryV1Dto } from '../../dtos/createCollectionDto';
import {
  FindCollectionParamsV1Dto,
  FindCollectionResponseV1Dto,
  FindCollectionQueryV1Dto,
} from '../../dtos/findCollectionDto';
import { RemoveCollectionParamsV1Dto, RemoveCollectionQueryV1Dto } from '../../dtos/removeCollection';
import {
  UpdateCollectionBodyV1Dto,
  UpdateCollectionParamsV1Dto,
  UpdateCollectionResponseV1Dto,
  UpdateCollectionQueryV1Dto,
} from '../../dtos/updateCollectionDto';

@ApiTags('Collections')
@Controller({ version: '1', path: '/collections' })
export class CollectionV1Controller {
  public constructor(
    private readonly dtoFactory: DtoFactory,
    private readonly collectionTransporter: CollectionTransporter,
  ) {}

  @ApiOperation({
    description: 'Create collection.',
  })
  @ApiCreatedResponse({
    description: 'Collection created.',
    type: CreateCollectionResponseV1Dto,
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createCollection(
    @Query() createCollectionQuery: CreateCollectionQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<CreateCollectionResponseV1Dto> {
    const { userId, title } = createCollectionQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const result = await this.collectionTransporter.createCollection({
      userId,
      title,
    });

    return this.dtoFactory.create(CreateCollectionResponseV1Dto, {
      collection: {
        id: result.collection.id,
        createdAt: result.collection.createdAt,
        updatedAt: result.collection.updatedAt,
        title: result.collection.title,
        thumbnailUrl: result.collection.thumbnailUrl,
        content: result.collection.content,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Find collection by id.',
  })
  @ApiOkResponse({
    description: 'Collection found.',
    type: FindCollectionResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':collectionId')
  public async findCollection(
    @Param() findCollectionParams: FindCollectionParamsV1Dto,
    @Query() findCollectionQuery: FindCollectionQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<FindCollectionResponseV1Dto> {
    const { collectionId } = findCollectionParams;

    const { userId } = findCollectionQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const result = await this.collectionTransporter.findCollection({
      userId,
      collectionId,
    });

    return this.dtoFactory.create(CreateCollectionResponseV1Dto, {
      collection: {
        id: result.collection.id,
        createdAt: result.collection.createdAt,
        updatedAt: result.collection.updatedAt,
        title: result.collection.title,
        thumbnailUrl: result.collection.thumbnailUrl,
        content: result.collection.content,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update collection by id.',
  })
  @ApiOkResponse({
    description: 'Collection updated.',
    type: UpdateCollectionResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':collectionId')
  public async updateCollection(
    @Param() updateCollectionParams: UpdateCollectionParamsV1Dto,
    @Query() updateCollectionQuery: UpdateCollectionQueryV1Dto,
    @Body() updateCollectionBody: UpdateCollectionBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<UpdateCollectionResponseV1Dto> {
    const { collectionId } = updateCollectionParams;

    const { userId } = updateCollectionQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { title, thumbnailUrl, content } = updateCollectionBody;

    const result = await this.collectionTransporter.updateCollection({
      userId,
      collectionId,
      title,
      thumbnailUrl,
      content,
    });

    return this.dtoFactory.create(CreateCollectionResponseV1Dto, {
      collection: {
        id: result.collection.id,
        createdAt: result.collection.createdAt,
        updatedAt: result.collection.updatedAt,
        title: result.collection.title,
        thumbnailUrl: result.collection.thumbnailUrl,
        content: result.collection.content,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove collection by id.',
  })
  @ApiNoContentResponse({
    description: 'Collection removed.',
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':collectionId')
  public async removeCollection(
    @Param() removeCollectionParams: RemoveCollectionParamsV1Dto,
    @Query() removeCollectionQuery: RemoveCollectionQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { collectionId } = removeCollectionParams;

    const { userId } = removeCollectionQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    await this.collectionTransporter.removeCollection({
      userId,
      collectionId,
    });
  }
}
