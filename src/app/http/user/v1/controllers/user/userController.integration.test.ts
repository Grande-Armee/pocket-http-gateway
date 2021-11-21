import { HttpStatus, INestApplication } from '@nestjs/common';

import { TestModuleHelper } from '@integration/helpers/testModuleHelper/testModuleHelper';
import { AuthService } from '@src/app/http/auth/services/auth/authService';
import { AuthHelper } from '@src/integration/helpers/authHelper/authHelper';
import { HttpHelper, HttpMethod } from '@src/integration/helpers/httpHelper/httpHelper';

class AuthServiceFake {
  public async verifyToken(): Promise<void> {}
}

const baseUrl = '/v1/users';
const loginUrl = `${baseUrl}/login`;
const resetPasswordUrl = `${baseUrl}/reset-password`;
const setPasswordUrl = `${baseUrl}/set-password`;

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

  describe('Create a user', () => {
    it('throws an error when some fields in request body are missing', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { email: 'email@gmail.com' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when value of email field is not an email', async () => {
      expect.assertions(1);

      const body = { email: 'email', password: '123456789012345' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when value of password field has less than 12 characters', async () => {
      expect.assertions(1);

      const body = { email: 'email@gmail.com', password: '123' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when email is valid and password has more than 12 characters', async () => {
      expect.assertions(1);

      const body = { email: 'email@gmail.com', password: '123456789012345' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${baseUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('Login user', () => {
    it('throws an error when some fields in request body are missing', async () => {
      expect.assertions(1);

      const body = { email: 'email@gmail.com' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${loginUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when value of email field is not an email', async () => {
      expect.assertions(1);

      const body = { email: 'email', password: '123456789012345' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${loginUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when value of password field has less than 12 characters', async () => {
      expect.assertions(1);

      const body = { email: 'email@gmail.com', password: '123' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${loginUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when email is valid and password has more than 12 characters', async () => {
      expect.assertions(1);

      const body = { email: 'email@gmail.com', password: '123456789012345' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${loginUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('Reset password', () => {
    it('throws an error when request body is missing', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${resetPasswordUrl}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when value of email field is not an email', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { email: 'email' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${resetPasswordUrl}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when email is valid', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { email: 'email@gmail.com' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${resetPasswordUrl}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const body = { email: 'email@gmail.com' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${resetPasswordUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Set password', () => {
    it('throws an error when request body is missing', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${setPasswordUrl}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when value of password field has less than 12 characters', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { password: '123' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${setPasswordUrl}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when password has more than 12 characters', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { password: '123456789012345' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${setPasswordUrl}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const body = { password: '123456789012345' };

      const response = await httpHelper.request({
        method: HttpMethod.POST,
        url: `${setPasswordUrl}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Update user', () => {
    it('throws an error when the userId param is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';
      const body = { language: 'en' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when language field is not provided in request body', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('throws an error when language field is not string', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { language: 1 };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('accepts a request when the userId param is a uuid and language is string', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { language: 'en' };

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${userId}`,
        token: authToken,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';
      const body = { language: 'en' };

      const response = await httpHelper.request({
        method: HttpMethod.PUT,
        url: `${baseUrl}/${userId}`,
        data: body,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('Remove user', () => {
    it('throws an error when the userId param is not a uuid', async () => {
      expect.assertions(1);

      const userId = '123';

      const authToken = authHelper.mockAuth({
        userId,
        role: '123',
      });

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
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
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${userId}`,
        token: authToken,
      });

      expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('requires bearer token authentication', async () => {
      expect.assertions(1);

      const userId = 'e46c11a8-8893-412d-bc8b-60753a98e45c';

      const response = await httpHelper.request({
        method: HttpMethod.DELETE,
        url: `${baseUrl}/${userId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
