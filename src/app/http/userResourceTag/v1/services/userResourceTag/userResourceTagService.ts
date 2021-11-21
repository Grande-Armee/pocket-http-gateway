import { Injectable } from '@nestjs/common';

@Injectable()
export class UserResourceTagV1Service {
  public async createUserResourceTag(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async removeUserResourceTag(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }
}
