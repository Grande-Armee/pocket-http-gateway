import { HttpStatus, INestApplication } from '@nestjs/common';

import { TestModuleHelper } from '@integration/helpers/testModuleHelper/testModuleHelper';
import { AuthService } from '@src/app/http/auth/services/auth/authService';
import { AuthHelper } from '@src/integration/helpers/authHelper/authHelper';
import { HttpHelper, HttpMethod } from '@src/integration/helpers/httpHelper/httpHelper';

class AuthServiceFake {
  public async verifyToken(): Promise<void> {}
}

const baseUrl = '/v1/resources';
const userIdField = 'userId';

describe(`UserResourceTagV1Controller (${baseUrl})`, () => {
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

  describe('Create user resource tag', () => {
    it('throws an error when the userId query is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the resourceId param is not uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = '123';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the tagId patam is not uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the userId, resourceId and tagId are uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Remove user resource tag', () => {
    it('throws an error when the userId query is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the resourceId param is not uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = '123';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the tagId patam is not uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the userId, resourceId and tagId are uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const tagId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}/tags/${tagId}?${userIdField}=${userId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
