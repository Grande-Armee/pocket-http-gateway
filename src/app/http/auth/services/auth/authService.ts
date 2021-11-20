import { Injectable } from '@nestjs/common';

import { AuthPayload } from '../../interfaces';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async verifyToken(_token: string): Promise<AuthPayload> {
    return {
      userId: 'e46c11a8-8893-412d-bc8b-60753a98e45c',
      role: 'USER',
    };
  }
}
