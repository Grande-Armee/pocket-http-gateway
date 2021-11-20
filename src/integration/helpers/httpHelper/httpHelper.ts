import { INestApplication } from '@nestjs/common';
import supertest, { Test } from 'supertest';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface HttpRequestOptions {
  readonly url: string;
  readonly method: HttpMethod;
  readonly token?: string;
  readonly data?: Record<string, any>;
  readonly query?: Record<string, any>;
}

export class HttpHelper {
  public constructor(private readonly app: INestApplication) {}

  public request(options: HttpRequestOptions): Test {
    const { method, url, token, data, query } = options;

    let request = supertest(this.app.getHttpServer())[method](url);

    if (token) {
      request = request.set({
        Authorization: token,
      });
    }

    if (query) {
      request = request.query(query);
    }

    if (data) {
      request = request.send(data);
    }

    return request;
  }
}
