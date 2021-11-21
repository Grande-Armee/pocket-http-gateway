import { Injectable } from '@nestjs/common';

@Injectable()
export class TagV1Service {
  public async createTag(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async updateTag(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async removeTag(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }
}
