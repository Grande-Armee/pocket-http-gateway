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

describe(`UserResourceV1Controller (${baseUrl})`, () => {
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

  describe('Find user resource', () => {
    it('throws an error when the resourceId param is not a uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the userId query is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the resourceId param and userId query are uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const response = await httpHelper.request({
        method: HttpMethod.GET,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Create user resource', () => {
    it('throws an error when the userId query is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const exampleUrl = 'www.example.com';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}?${userIdField}=${userId}`,
        token: authToken,
        data: { url: exampleUrl },
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the url in body is not provided', async () => {
      expect.assertions(1);

      const userId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the url in body is not string', async () => {
      expect.assertions(1);

      const userId = '123';
      const exampleUrl = 123;

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}?${userIdField}=${userId}`,
        token: authToken,
        data: { url: exampleUrl },
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the userId query is a uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const exampleUrl = 'www.example.com';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}?${userIdField}=${userId}`,
        token: authToken,
        data: { url: exampleUrl },
      });

      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const exampleUrl = 'www.example.com';

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}?${userIdField}=${userId}`,
        data: { url: exampleUrl },
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Update user resource', () => {
    it('throws an error when the resourceId param is not a uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = '123';
      const body = { title: 'title', thumbnailUrl: 'thumbnailUrl', content: 'content' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the userId query is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { title: 'title', thumbnailUrl: 'thumbnailUrl', content: 'content' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws when any of body fields is not string', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { title: 'title', thumbnailUrl: 'thumbnailUrl', content: true };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the resourceId param and userId query are uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { title: 'title', thumbnailUrl: 'thumbnailUrl', content: 'content' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { title: 'title', thumbnailUrl: 'thumbnailUrl', content: 'content' };

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Remove user resource', () => {
    it('throws an error when the resourceId param is not a uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when the userId query is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the resourceId param and userId query are uuid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const resourceId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${resourceId}?${userIdField}=${userId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
