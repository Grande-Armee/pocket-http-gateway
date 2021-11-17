import { Injectable } from '@nestjs/common';

@Injectable()
export class UserV1Service {
  public async createUser(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async findUser(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async updateUser(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async removeUser(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }
}
