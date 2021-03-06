import { DtoFactory, UserTransporter } from '@grande-armee/pocket-common';
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
import { LoginUserBodyV1Dto, LoginUserResponseV1Dto } from '../../dtos/loginUserDto';
import { RemoveUserParamsV1Dto } from '../../dtos/removeUserDto';
import { SetPasswordBodyV1Dto } from '../../dtos/setPasswordDto';
import { UpdateUserBodyV1Dto, UpdateUserParamsV1Dto, UpdateUserResponseV1Dto } from '../../dtos/updateUserDto';

@ApiTags('Users')
@Controller({ version: '1', path: '/users' })
export class UserV1Controller {
  public constructor(private readonly userTransporter: UserTransporter, private readonly dtoFactory: DtoFactory) {}

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
    const { email, password, language } = createUserBody;

    const result = await this.userTransporter.createUser({
      email,
      password,
      language,
    });

    return this.dtoFactory.create(CreateUserResponseV1Dto, {
      user: {
        id: result.user.id,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
        email: result.user.email,
        language: result.user.language,
        role: result.user.role,
      },
    });
  }

  @ApiOperation({
    description: 'Login user.',
  })
  @ApiOkResponse({
    description: 'User logged in.',
    type: LoginUserResponseV1Dto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async loginUser(@Body() loginUserBody: LoginUserBodyV1Dto): Promise<LoginUserResponseV1Dto> {
    const { email, password } = loginUserBody;

    const result = await this.userTransporter.loginUser({
      email,
      password,
    });

    return this.dtoFactory.create(LoginUserResponseV1Dto, {
      token: result.token,
    });
  }

  @ApiOperation({
    description: 'Reset password.',
  })
  @ApiNoContentResponse({
    description: 'Password is reset.',
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/reset-password')
  public async resetPassword(): Promise<void> {
    //TODO: add reset password rpc
  }

  @ApiOperation({
    description: 'Set password.',
  })
  @ApiNoContentResponse({
    description: 'Password is set.',
  })
  @UseGuards(BearerTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/set-password')
  public async setPassword(@Body() setPasswordBody: SetPasswordBodyV1Dto): Promise<void> {
    const { userId, password } = setPasswordBody;

    await this.userTransporter.setNewPassword({ userId, newPassword: password });
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

    const result = await this.userTransporter.findUser({
      userId,
    });

    return this.dtoFactory.create(CreateUserResponseV1Dto, {
      user: {
        id: result.user.id,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
        email: result.user.email,
        language: result.user.language,
        role: result.user.role,
      },
    });
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

    const { language } = updateUserBody;

    const result = await this.userTransporter.updateUser({
      userId,
      language,
    });

    return this.dtoFactory.create(CreateUserResponseV1Dto, {
      user: {
        id: result.user.id,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
        email: result.user.email,
        language: result.user.language,
        role: result.user.role,
      },
    });
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

    await this.userTransporter.removeUser({
      userId,
    });
  }
}
