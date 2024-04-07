import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";

import { CommonModule } from './modules/common/common.module';
import {LoggingMiddleware} from "./middlewares/nestLogger/middlewareLogger";
import { AuthModule } from './modules/auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UserSchema} from "./schemas/user.schema";
import { UserModule } from './modules/user/user.module';
import { WinstonModule } from './utils/logger/winston/winston.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              uri: configService.get<string>("MONGODB_URL"),
          }),
      }),
      MongooseModule.forFeature([
          { name: Users.name, schema: UserSchema }
      ]),
      WinstonModule,
      CommonModule,
      AuthModule,
      UserModule,
      WinstonModule

  ],
  providers: [LoggingMiddleware],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
