import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthPayload } from '../../interfaces';

export const BearerTokenPayload = createParamDecorator<AuthPayload>((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const authPayload = request.authPayload;

  return {
    userId: authPayload?.userId,
    role: authPayload?.role,
  };
});
