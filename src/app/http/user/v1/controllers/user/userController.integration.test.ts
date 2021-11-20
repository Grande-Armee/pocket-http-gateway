import { HttpStatus, INestApplication } from '@nestjs/common';

import { TestModuleHelper } from '@integration/helpers/testModuleHelper/testModuleHelper';
import { AuthService } from '@src/app/http/auth/services/auth/authService';
import { AuthHelper } from '@src/integration/helpers/authHelper/authHelper';
import { HttpHelper, HttpMethod } from '@src/integration/helpers/httpHelper/httpHelper';

class AuthServiceFake {
  public async verifyToken(): Promise<void> {}
}

const baseUrl = '/v1/users';

describe(`UserV1Controller (${baseUrl})`, () => {
  let app: INestApplication;
  let httpHelper: HttpHelper;
  let authHelper: AuthHelper;

  beforeEach(async () => {
    const moduleRef = await TestModuleHelper.createTestingModule()
      .overrideProvider(AuthService)
      .useClass(AuthServiceFake)
      .compile();

    app = await TestModuleHelper.createApp(moduleRef);
    httpHelper = new HttpHelper(app);
    authHelper = new AuthHelper(app);
  });

  afterEach(async () => {
    await app.close();
  });

  // what to test?
  // 1. input validation (body, query, params)
  // body - what if a property is missing?
  // body - what if a property is of a different type?
  // params - what if a param is not a uuid but a number?
  // 2. does it require auth?
  // 3. cover all possible responses: 200, 403 (auth), 404 (not found) body.user.id === userId etc

  describe('Find a user', () => {
    it('throws an error when the userId param is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the userId param is a uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${userId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
