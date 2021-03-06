import { CollectionResourceTransporter, DtoFactory } from '@grande-armee/pocket-common';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { BearerTokenPayload } from '@http/auth/decorators/authTokenPayload/authTokenPayloadDecorator';
import { BearerTokenGuard } from '@http/auth/guards/bearerToken/bearerTokenGuard';
import { AuthPayload } from '@http/auth/interfaces';

import {
  CreateCollectionResourceParamsV1Dto,
  CreateCollectionResourceResponseV1Dto,
  CreateCollectionResourceQueryV1Dto,
} from '../../dtos/createCollectionResourceDto';
import {
  RemoveCollectionResourceParamsV1Dto,
  RemoveCollectionResourceQueryV1Dto,
} from '../../dtos/removeCollectionResourceDto';

@ApiTags('CollectionResources')
@Controller({ version: '1', path: '/collections/:collectionId/resources/:resourceId' })
export class CollectionResourceV1Controller {
  public constructor(
    private readonly collectionResourceTransporter: CollectionResourceTransporter,
    private readonly dtoFactory: DtoFactory,
  ) {}

  @ApiOperation({
    description: 'Create collection resource.',
  })
  @ApiCreatedResponse({
    description: 'Collection resource created.',
    type: CreateCollectionResourceResponseV1Dto,
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createCollectionResource(
    @Param() createCollectionResourceParams: CreateCollectionResourceParamsV1Dto,
    @Query() createCollectionResourceQuery: CreateCollectionResourceQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<CreateCollectionResourceResponseV1Dto> {
    const { userId } = createCollectionResourceQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { resourceId, collectionId } = createCollectionResourceParams;

    const result = await this.collectionResourceTransporter.createCollectionResource({
      resourceId,
      collectionId,
    });

    return this.dtoFactory.create(CreateCollectionResourceResponseV1Dto, {
      collectionResource: {
        id: result.collectionResource.id,
        createdAt: result.collectionResource.createdAt,
        updatedAt: result.collectionResource.updatedAt,
        resourceId: result.collectionResource.resourceId,
        collectionId: result.collectionResource.collectionId,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove collection resource by id.',
  })
  @ApiNoContentResponse({
    description: 'Collection resource removed.',
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public async removeCollectionResource(
    @Param() removeCollectionResourceParams: RemoveCollectionResourceParamsV1Dto,
    @Query() removeCollectionResourceQuery: RemoveCollectionResourceQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { userId } = removeCollectionResourceQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { resourceId, collectionId } = removeCollectionResourceParams;

    await this.collectionResourceTransporter.removeCollectionResource({
      resourceId,
      collectionId,
    });
  }
}
