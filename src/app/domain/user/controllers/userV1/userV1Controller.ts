import { Controller, Get } from '@nestjs/common';

import { UserV1Service } from '../../services/userV1/userV1Service';

@Controller({ version: '1', path: '/users' })
export class UserV1Controller {
  public constructor(private readonly userService: UserV1Service) {}

  @Get()
  public getHello(): string {
    return this.userService.getHello();
  }
}
