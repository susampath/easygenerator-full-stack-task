import { Module } from '@nestjs/common';

import { CommonController } from './controllers/common.controller';
import {MainService} from "../../utils/responseHandler/main.service";

@Module({
  controllers: [CommonController],
  providers:[MainService]
})
export class CommonModule {}
