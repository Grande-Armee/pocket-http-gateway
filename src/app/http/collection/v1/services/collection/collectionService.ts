import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectionV1Service {
  public async createCollection(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async findCollection(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async updateCollection(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async removeCollection(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }
}
