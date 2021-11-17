import { CommonModule } from '@grande-armee/pocket-common';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class SharedModule {}
