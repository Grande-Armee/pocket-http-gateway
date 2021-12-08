import { DtoFactory, UserResourceTagTransporter } from '@grande-armee/pocket-common';
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
  CreateUserResourceTagParamsV1Dto,
  CreateUserResourceTagResponseV1Dto,
  CreateUserResourceTagQueryV1Dto,
} from '../../dtos/createUserResourceTagDto';
import { RemoveUserResourceTagParamsV1Dto, RemoveUserResourceTagQueryV1Dto } from '../../dtos/removeUserResourceTagDto';

@ApiTags('UserResourceTags')
@Controller({ version: '1', path: '/resources/:resourceId/tags/:tagId' })
export class UserResourceTagV1Controller {
  public constructor(
    private readonly userResourceTagTransporter: UserResourceTagTransporter,
    private readonly dtoFactory: DtoFactory,
  ) {}

  @ApiOperation({
    description: 'Create user resource tag.',
  })
  @ApiCreatedResponse({
    description: 'User resource tag created.',
    type: CreateUserResourceTagResponseV1Dto,
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUserResourceTag(
    @Param() createUserResourceTagParams: CreateUserResourceTagParamsV1Dto,
    @Query() createUserResourceTagQuery: CreateUserResourceTagQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<CreateUserResourceTagResponseV1Dto> {
    const { userId } = createUserResourceTagQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { resourceId, tagId } = createUserResourceTagParams;

    const result = await this.userResourceTagTransporter.createUserResourceTag({
      userId,
      resourceId,
      tagId,
    });

    console.log(result);

    return this.dtoFactory.create(CreateUserResourceTagResponseV1Dto, {
      userResourceTag: {
        id: '123',
        createdAt: '123',
        updatedAt: '123',
        userId: '123',
        resourceId: '123',
        tagId: '123',
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove user resource tag by id.',
  })
  @ApiNoContentResponse({
    description: 'User resource tag removed.',
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public async removeUserResourceTag(
    @Param() removeUserResourceTagParams: RemoveUserResourceTagParamsV1Dto,
    @Query() removeUserResourceTagQuery: RemoveUserResourceTagQueryV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { userId } = removeUserResourceTagQuery;

    if (authPayload.userId !== userId) {
      throw new ForbiddenException('User id from auth token does not match user id from query.');
    }

    const { resourceId, tagId } = removeUserResourceTagParams;

    await this.userResourceTagTransporter.removeUserResourceTag({
      userId,
      resourceId,
      tagId,
    });
  }
}
