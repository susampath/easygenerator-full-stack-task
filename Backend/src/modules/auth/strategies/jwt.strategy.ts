import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET"),
        });
    }

    /**
     * Validates the payload.
     *
     * @param {any} payload - The payload to validate.
     * @returns {Promise<{ userId: string, email: string, name: string }>} An object containing the validated payload.
     */
    async validate(payload: any): Promise<{userId: string; email: string; name: string}> {
        return {userId: payload._id, email: payload.email, name: payload.name};
    }
}
