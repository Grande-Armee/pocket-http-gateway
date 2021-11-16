import { Injectable } from '@nestjs/common';

@Injectable()
export class UserV1Service {
  public getHello(): string {
    return 'Hello World!';
  }
}
