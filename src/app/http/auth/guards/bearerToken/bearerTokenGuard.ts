import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '../../services/auth/authService';

export class InvalidTokenException {}

@Injectable()
export class BearerTokenGuard implements CanActivate {
  public constructor(private readonly authService: AuthService) {}

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

      const authPayload = await this.authService.verifyToken(token);

      request.authPayload = authPayload;

      return true;
    } catch (e) {
      return false;
    }
  }
}
