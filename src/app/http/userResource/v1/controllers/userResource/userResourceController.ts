import { DtoFactory } from '@grande-armee/pocket-common';
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
  CreateUserResourceQueriesV1Dto,
} from '../../dtos/createUserResourceDto';
import {
  FindUserResourceParamsV1Dto,
  FindUserResourceResponseV1Dto,
  FindUserResourceQueriesV1Dto,
} from '../../dtos/findUserResourceDto';
import { RemoveUserResourceParamsV1Dto, RemoveUserResourceQueriesV1Dto } from '../../dtos/removeUserResourceDto';
import {
  UpdateUserResourceBodyV1Dto,
  UpdateUserResourceParamsV1Dto,
  UpdateUserResourceResponseV1Dto,
  UpdateUserResourceQueriesV1Dto,
} from '../../dtos/updateUserResourceDto';
import { UserResourceV1Service } from '../../services/userResource/userResourceService';

@ApiTags('UserResources')
@Controller({ version: '1', path: '/resources' })
export class UserResourceV1Controller {
  public constructor(
    private readonly userResourceService: UserResourceV1Service,
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
    @Query() createUserResourceQueries: CreateUserResourceQueriesV1Dto,
    @Body() createUserResourceBody: CreateUserResourceBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<CreateUserResourceResponseV1Dto> {
    const { userId } = createUserResourceQueries;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant find other users.');
    }

    const { url } = createUserResourceBody;

    const result = await this.userResourceService.createUserResource({
      userId,
      url,
    });

    console.log(result);

    return this.dtoFactory.createDtoInstance(CreateUserResourceResponseV1Dto, {
      userResource: {
        id: '123',
        createdAt: '123',
        updatedAt: '123',
        url: 'www.google.com',
        title: 'title',
        thumbnailUrl: 'www.google.com',
        content: 'content',
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
    @Query() findUserResourceQueries: FindUserResourceQueriesV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<FindUserResourceResponseV1Dto> {
    const { resourceId } = findUserResourceParams;

    const { userId } = findUserResourceQueries;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant find other users.');
    }

    const result = await this.userResourceService.findUserResource({
      userId,
      resourceId,
    });

    console.log(result);

    return this.dtoFactory.createDtoInstance(FindUserResourceResponseV1Dto, {
      userResource: {
        id: '12345',
        createdAt: '12345',
        updatedAt: '12345',
        url: 'www.google.com',
        title: 'title',
        thumbnailUrl: 'www.google.com',
        content: 'content',
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
    @Query() updateUserResourceQueries: UpdateUserResourceQueriesV1Dto,
    @Body() updateUserResourceBody: UpdateUserResourceBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<UpdateUserResourceResponseV1Dto> {
    const { resourceId } = updateUserResourceParams;

    const { userId } = updateUserResourceQueries;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant update other users.');
    }

    const result = await this.userResourceService.updateUserResource({
      userId,
      resourceId,
      userResourceData: updateUserResourceBody,
    });

    console.log(result);

    return this.dtoFactory.createDtoInstance(UpdateUserResourceResponseV1Dto, {
      userResource: {
        id: '1234567',
        createdAt: '1234567',
        updatedAt: '1234567',
        url: 'www.google.com',
        title: 'title',
        thumbnailUrl: 'www.google.com',
        content: 'content',
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
    @Query() removeUserResourceQueries: RemoveUserResourceQueriesV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { resourceId } = removeUserResourceParams;

    const { userId } = removeUserResourceQueries;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant remove other users.');
    }

    await this.userResourceService.removeUserResource({
      userId,
      resourceId,
    });
  }
}
