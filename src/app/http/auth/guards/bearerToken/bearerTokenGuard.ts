import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthPayload } from '../../interfaces';

export class InvalidTokenException {}

@Injectable()
export class BearerTokenGuard implements CanActivate {
  private validateAndParseToken(authHeaderContent: string): string {
    if (typeof authHeaderContent !== 'string') {
      return '';
    }

    const token = authHeaderContent.split(' ').pop();

    if (!token) {
      return '';
    }

    return token;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = this.validateAndParseToken(request.headers.authorization);

      if (!token) {
        return false;
      }

      const authPayload: AuthPayload = {
        userId: 'e46c11a8-8893-412d-bc8b-60753a98e45c',
        role: 'USER',
      };

      request.authPayload = authPayload;

      return true;
    } catch (e) {
      return false;
    }
  }
}
