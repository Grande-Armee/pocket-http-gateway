import { Module } from '@nestjs/common';

import { HttpModule } from './http/httpModule';
import { SharedModule } from './shared/sharedModule';

@Module({
  imports: [SharedModule, HttpModule],
})
export class AppModule {}
