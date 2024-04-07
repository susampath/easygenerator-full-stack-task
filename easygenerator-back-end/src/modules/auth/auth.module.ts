import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {MainService} from "../../utils/responseHandler/main.service";
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {expiresIn: configService.get<string>("JWT_EXPIRE_TIME")},
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, MainService,JwtStrategy],
})
export class AuthModule {
}
