import { Injectable } from '@nestjs/common';

@Injectable()
export class UserResourceV1Service {
  public async createUserResource(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async findUserResource(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async updateUserResource(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async removeUserResource(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }
}
