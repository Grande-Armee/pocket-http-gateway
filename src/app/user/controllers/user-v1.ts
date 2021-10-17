import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services/user';

@Controller({ version: '1', path: '/users' })
export class UserV1Controller {
  public constructor(private readonly userService: UserService) {}

  @Get()
  public getHello(): string {
    return this.userService.getHello();
  }
}
