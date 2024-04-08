import {HttpException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import {RegisterDTO} from "../dtos/register";
import {UserService} from "../../user/services/user.service";
import {sanitizeUser} from "../../../helpers/user.helper";
import {ResponseCode} from "../../../constants/response.codes";
import {ResponseMessages} from "../../../constants/response.messages";
import {IUser} from "../../../schemas/interfaces/user.interface";
import {WinstonService} from "../../../utils/logger/winston/winston.service";


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        private readonly logger: WinstonService,
    ) {
    }

    /**
     * Registers a new user with provided user data.
     *
     * @param {RegisterDTO} userData - The user data to register.
     * @returns {Promise<{user: Record<string, string>, access_token: string}>}
     *                  A promise that resolves to an object containing the registered user and an access token.
     * @throws {HttpException} If user is not found or credentials are invalid.
     */
    async registerUser(userData: RegisterDTO): Promise<{user: Record<string, string>, access_token: string}> {
        try {
            const savedUser = await this.userService.createUser(userData);
            return {
                user: sanitizeUser(savedUser),
                access_token: this.jwtService.sign(sanitizeUser(savedUser)),
            };

        } catch (error) {
            this.logger.error(`${AuthService.name} ==> :  `, error);
            throw error;
        }
    }

    /**
     * Logs in a user with the provided credentials.
     *
     * @param {Object} user - The user object containing email and password.
     * @param {string} user.email - The email of the user.
     * @param {string} user.password - The password of the user.
     * @returns {Promise<Object>} An object containing user data and access token upon successful login.
     * @throws {HttpException} If user is not found or credentials are invalid.
     */
    async login(user: any): Promise<{user: Record<string, string>, access_token: string}> {
        try {
            const {email, password} = user;
            const userObj: IUser = await this.userService.findUserByEmail(email);
            if (!userObj) {
                this.logger.error(`${AuthService.name} ==> User Not found  : `, user.email);
                throw new HttpException(ResponseMessages.USER_NOT_FOUND, ResponseCode.INVALID_CREDENTIALS);
            }
            if (await bcrypt.compare(password, userObj.password)) {
                return {
                    user: sanitizeUser(userObj),
                    access_token: this.jwtService.sign(sanitizeUser(userObj)),
                };
            } else {
                this.logger.error(`${AuthService.name} ==> User password doesn't matched  :  `, user.email);
                throw new HttpException(ResponseMessages.INVALID_CREDENTIALS, ResponseCode.INVALID_CREDENTIALS);
            }
        } catch (error) {
            this.logger.error(`${AuthService.name} ==> :  `, error);
            throw error;
        }

    }
}
