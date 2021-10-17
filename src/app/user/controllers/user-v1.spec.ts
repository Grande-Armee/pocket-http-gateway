import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../services/user';
import { UserV1Controller } from './user-v1';

describe('UserV1Controller', () => {
  let userV1Controller: UserV1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserV1Controller],
      providers: [UserService],
    }).compile();

    userV1Controller = app.get<UserV1Controller>(UserV1Controller);
  });

  describe('GET /v1', () => {
    it('should return "Hello World!"', () => {
      expect(userV1Controller.getHello()).toBe('Hello World!');
    });
  });
});
