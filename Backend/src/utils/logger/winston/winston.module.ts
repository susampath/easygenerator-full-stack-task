import {Global, Module} from "@nestjs/common";
import { WinstonService } from './winston.service';

@Module({
  providers: [WinstonService],
  exports: [WinstonService]
})
@Global()
export class WinstonModule {}
