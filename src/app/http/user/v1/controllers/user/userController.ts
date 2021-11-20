import { DtoFactory } from '@grande-armee/pocket-common';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
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

import { CreateUserBodyV1Dto, CreateUserResponseV1Dto } from '../../dtos/createUserDto';
import { FindUserParamsV1Dto, FindUserResponseV1Dto } from '../../dtos/findUserDto';
import { RemoveUserParamsV1Dto } from '../../dtos/removeUserDto';
import { UpdateUserBodyV1Dto, UpdateUserParamsV1Dto, UpdateUserResponseV1Dto } from '../../dtos/updateUserDto';
import { UserV1Service } from '../../services/user/userService';

@ApiTags('Users')
@Controller({ version: '1', path: '/users' })
export class UserV1Controller {
  public constructor(private readonly userService: UserV1Service, private readonly dtoFactory: DtoFactory) {}

  @ApiOperation({
    description: 'Register a user.',
  })
  @ApiCreatedResponse({
    description: 'User created.',
    type: CreateUserResponseV1Dto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUser(@Body() createUserBody: CreateUserBodyV1Dto): Promise<CreateUserResponseV1Dto> {
    const { email, password } = createUserBody;

    const result = await this.userService.createUser({
      email,
      password,
    });

    console.log(result);

    return this.dtoFactory.createDtoInstance(CreateUserResponseV1Dto, {
      user: {
        id: '123',
        createdAt: '123',
        updatedAt: '123',
        email: '123',
        isActive: true,
        language: 'en',
        role: 'USER',
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Find user by id.',
  })
  @ApiOkResponse({
    description: 'User found.',
    type: FindUserResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':userId')
  public async findUser(
    @Param() findUserParams: FindUserParamsV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<FindUserResponseV1Dto> {
    const { userId } = findUserParams;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant find other users.');
    }

    const result = await this.userService.findUser({
      userId,
    });

    console.log(result);

    return {
      user: {
        id: '123',
        createdAt: '123',
        updatedAt: '123',
        email: '123',
        isActive: true,
        language: 'en',
        role: 'USER',
      },
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update user by id.',
  })
  @ApiOkResponse({
    description: 'User updated.',
    type: UpdateUserResponseV1Dto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(BearerTokenGuard)
  @Put(':userId')
  public async updateUser(
    @Param() updateUserParams: UpdateUserParamsV1Dto,
    @Body() updateUserBody: UpdateUserBodyV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<UpdateUserResponseV1Dto> {
    const { userId } = updateUserParams;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant update other users.');
    }

    const result = await this.userService.updateUser({
      userId,
      userData: updateUserBody,
    });

    console.log(result);

    return {
      user: {
        id: '123',
        createdAt: '123',
        updatedAt: '123',
        email: '123',
        isActive: true,
        language: 'en',
        role: 'USER',
      },
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove user by id.',
  })
  @ApiNoContentResponse({
    description: 'User removed.',
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  public async removeUser(
    @Param() removeUserParams: RemoveUserParamsV1Dto,
    @BearerTokenPayload() authPayload: AuthPayload,
  ): Promise<void> {
    const { userId } = removeUserParams;

    if (authPayload.userId !== userId && authPayload.role === 'USER') {
      throw new Error('Cant remove other users.');
    }

    await this.userService.removeUser({
      userId,
    });
  }
}
