import { CommonModule } from '@grande-armee/pocket-common';
import { Global, Module } from '@nestjs/common';

import { HttpModule } from './http/httpModule';

@Global()
@Module({
  imports: [CommonModule, HttpModule],
  exports: [CommonModule, HttpModule],
})
export class SharedModule {}
