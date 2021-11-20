import { INestApplication } from '@nestjs/common';

import { AuthPayload } from '@http/auth/interfaces';
import { AuthService } from '@http/auth/services/auth/authService';

export class AuthHelper {
  public constructor(private readonly app: INestApplication) {}

  public mockAuth(authPayload: AuthPayload): string {
    const fakeToken = 'token';
    const authService = this.app.get(AuthService);

    jest.spyOn(authService, 'verifyToken').mockImplementation(async (token) => {
      if (token !== fakeToken) {
        throw new Error('Invalid token.');
      }

      return {
        ...authPayload,
      };
    });

    return fakeToken;
  }
}
