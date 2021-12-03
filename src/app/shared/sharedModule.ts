import { BrokerModule, CommonModule } from '@grande-armee/pocket-common';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [CommonModule, BrokerModule],
  exports: [CommonModule, BrokerModule],
})
export class SharedModule {}
