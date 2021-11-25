import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectionResourceV1Service {
  public async createCollectionResource(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }

  public async removeCollectionResource(payload: any): Promise<any> {
    console.log(payload);

    return payload;
  }
}
