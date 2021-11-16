import { Test, TestingModule } from '@nestjs/testing';

import { UserV1Service } from '../../services/userV1/userV1Service';
import { UserV1Controller } from './userV1Controller';

describe('UserV1Controller', () => {
  let userV1Controller: UserV1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserV1Controller],
      providers: [UserV1Service],
    }).compile();

    userV1Controller = app.get<UserV1Controller>(UserV1Controller);
  });

  describe('GET /v1', () => {
    it('should return "Hello World!"', () => {
      expect(userV1Controller.getHello()).toBe('Hello World!');
    });
  });
});
