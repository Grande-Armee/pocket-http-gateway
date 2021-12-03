import { DtoFactory, ResourceTransporter } from '@grande-armee/pocket-common';
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

import {
  CreateUserResourceBodyV1Dto,
  CreateUserResourceResponseV1Dto,
  CreateUserResourceQueryV1Dto,
} from '../../dtos/createUserResourceDto';
import {
  FindUserResourceParamsV1Dto,
  FindUserResourceResponseV1Dto,
  FindUserResourceQueryV1Dto,
} from '../../dtos/findUserResourceDto';
import { RemoveUserResourceParamsV1Dto, RemoveUserResourceQueryV1Dto } from '../../dtos/removeUserResourceDto';
import {
  UpdateUserResourceBodyV1Dto,
  UpdateUserResourceParamsV1Dto,
  UpdateUserResourceResponseV1Dto,
  UpdateUserResourceQueryV1Dto,
} from '../../dtos/updateUserResourceDto';

@ApiTags('UserResources')
@Controller({ version: '1', path: '/resources' })
export class UserResourceV1Controller {
  public constructor(
    private readonly resourceTransporter: ResourceTransporter,
    private readonly dtoFactory: DtoFactory,
  ) {}

  @ApiOperation({
    description: 'Create user resource.',
  })
  @ApiCreatedResponse({
    description: 'User resource created.',
    type: CreateUserResourceResponseV1Dto,
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUserResource(
    @Query() createUserResourceQuery: CreateUserResourceQueryV1Dto,
    @Body() createUserResourceBody: CreateUserResourceBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<CreateUserResourceResponseV1Dto> {
    const { userId } = createUserResourceQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { url } = createUserResourceBody;

    const resourceResult = await this.resourceTransporter.createResource({
      url,
    });

    return this.dtoFactory.create(CreateUserResourceResponseV1Dto, {
      userResource: {
        id: resourceResult.resource.id,
        createdAt: resourceResult.resource.createdAt,
        updatedAt: resourceResult.resource.updatedAt,
        url: resourceResult.resource.url,
        title: resourceResult.resource.title,
        thumbnailUrl: resourceResult.resource.thumbnailUrl,
        content: resourceResult.resource.content,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Find user resource by id.',
  })
  @ApiOkResponse({
    description: 'User resource found.',
    type: FindUserResourceResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':resourceId')
  public async findUserResource(
    @Param() findUserResourceParams: FindUserResourceParamsV1Dto,
    @Query() findUserResourceQuery: FindUserResourceQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<FindUserResourceResponseV1Dto> {
    const { resourceId } = findUserResourceParams;

    const { userId } = findUserResourceQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const result = await this.resourceTransporter.findResource({
      resourceId,
    });

    return this.dtoFactory.create(CreateUserResourceResponseV1Dto, {
      userResource: {
        id: result.resource.id,
        createdAt: result.resource.createdAt,
        updatedAt: result.resource.updatedAt,
        url: result.resource.url,
        title: result.resource.title,
        thumbnailUrl: result.resource.thumbnailUrl,
        content: result.resource.content,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update user resource by id.',
  })
  @ApiOkResponse({
    description: 'User resource updated.',
    type: UpdateUserResourceResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':resourceId')
  public async updateUserResource(
    @Param() updateUserResourceParams: UpdateUserResourceParamsV1Dto,
    @Query() updateUserResourceQuery: UpdateUserResourceQueryV1Dto,
    @Body() updateUserResourceBody: UpdateUserResourceBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<UpdateUserResourceResponseV1Dto> {
    const { resourceId } = updateUserResourceParams;

    const { userId } = updateUserResourceQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { title, thumbnailUrl, content } = updateUserResourceBody;

    const result = await this.resourceTransporter.updateResource({
      resourceId,
      title,
      thumbnailUrl,
      content,
    });

    return this.dtoFactory.create(CreateUserResourceResponseV1Dto, {
      userResource: {
        id: result.resource.id,
        createdAt: result.resource.createdAt,
        updatedAt: result.resource.updatedAt,
        url: result.resource.url,
        title: result.resource.title,
        thumbnailUrl: result.resource.thumbnailUrl,
        content: result.resource.content,
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove user resource by id.',
  })
  @ApiNoContentResponse({
    description: 'User resource removed.',
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':resourceId')
  public async removeUserResource(
    @Param() removeUserResourceParams: RemoveUserResourceParamsV1Dto,
    @Query() removeUserResourceQuery: RemoveUserResourceQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { resourceId } = removeUserResourceParams;

    const { userId } = removeUserResourceQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    await this.resourceTransporter.removeResource({
      resourceId,
    });
  }
}
