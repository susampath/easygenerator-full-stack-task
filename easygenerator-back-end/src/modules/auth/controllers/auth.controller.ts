import {Body, Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import {Response, Request} from "express";
import {ApiResponse} from "@nestjs/swagger";

import {MainService} from "../../../utils/responseHandler/main.service";
import {AuthService} from "../services/auth.service";
import {ResponseMessages} from "../../../constants/response.messages";
import {ResponseCode} from "../../../constants/response.codes";
import {RegisterDTO} from "../dtos/register";
import {UserService} from "../../user/services/user.service";
import {IUser} from "../../../schemas/interfaces/user.interface";
import {LoginDTO} from "../dtos/login";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {WinstonService} from "../../../utils/logger/winston/winston.service";


@Controller("auth")
export class AuthController {

    constructor(
        private readonly mainService: MainService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly logger: WinstonService,
    ) {
    }

    /**
     *
     *  User Registration
     *      This will retrieve user registration data and save the user
     *
     * Sample Request
     *     - Body
     *          - name : <string>
     *          - password : <string>
     *          - email : <string>
     * @param {RegisterDTO} requestBody
     * @param  {Response} response
     * @returns user object with access token
     */
    @Post("register")
    @ApiResponse({status: ResponseCode.SUCCESS, description: ResponseMessages.USER_REGISTER_SUCCESS})
    @ApiResponse({status: ResponseCode.EMAIL_EXITS, description: ResponseMessages.EMAIL_EXITS})
    @ApiResponse({status: ResponseCode.INTERNAL_SERVER_ERROR, description: ResponseMessages.INTERNAL_SERVER_ERROR})
    @ApiResponse({status: ResponseCode.VALIDATION_ERROR, description: ResponseMessages.UNPROCESSABLE_CONTENT})
    async register(@Body() requestBody: RegisterDTO, @Res() response: Response): Promise<void> {
        try {
            const existingUser: IUser = await this.userService.findUserByEmail(requestBody.email);
            if (existingUser) {
                this.mainService.sendResponse(response, ResponseMessages.EMAIL_EXITS, {}, false, ResponseCode.EMAIL_EXITS);
                this.logger.warn(`${AuthController.name} ==> Email duplication in user registration  : ${existingUser.email} `);

            } else {
                const result: {
                    user: Record<string, string>,
                    access_token: string
                } = await this.authService.registerUser(requestBody);
                this.mainService.sendResponse(response, ResponseMessages.USER_REGISTER_SUCCESS, result, true, ResponseCode.SUCCESS);
                this.logger.log(`${AuthController.name} ==> User registered in successfully  : ${result.user.email} `);

            }

        } catch (error) {
            this.logger.error(`${AuthController.name} : `, error);
            this.mainService.sendResponse(
                response,
                ResponseMessages.INTERNAL_SERVER_ERROR,
                error,
                false,
                ResponseCode.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     *
     *  User Login
     *      This will retrieve user credentials and check credential validity
     * Sample Request
     *     - Body
     *          - password : <string>
     *          - email : <string>
     * @param {Request} req
     * @param {LoginDTO} loginDTO
     * @param  {Response} response
     * @returns user object with access token
     */
    @Post("login")
    @ApiResponse({status: ResponseCode.SUCCESS, description: ResponseMessages.USER_LOGIN_SUCCESS})
    @ApiResponse({status: ResponseCode.INVALID_CREDENTIALS, description: ResponseMessages.INVALID_CREDENTIALS})
    @ApiResponse({status: ResponseCode.INTERNAL_SERVER_ERROR, description: ResponseMessages.INTERNAL_SERVER_ERROR})
    async login(@Req() req: Request, @Body() loginDTO: LoginDTO, @Res() response: Response): Promise<void> {
        try {
            const userDetails: {
                user: Record<string, string>,
                access_token: string
            } = await this.authService.login(loginDTO);
            this.mainService.sendResponse(response, ResponseMessages.USER_LOGIN_SUCCESS, userDetails, true, ResponseCode.SUCCESS);
            this.logger.log(`${AuthController.name} ==> User logged in successfully  : ${userDetails.user.email} `);
        } catch (error) {
            this.logger.error(`${AuthController.name} ==> `, error);
            this.mainService.sendResponse(
                response,
                ResponseMessages.INTERNAL_SERVER_ERROR,
                error,
                false,
                error.status,
            );
        }
    }

    /**
     *
     *  User Details
     *      This will end point is used to showcase the authenticated end point functionality.Here user data will be retrieved form the access token
     *          and send back to front end
     * Sample Request
     *     - Header
     *          - AccessToken : <string>
     * @param {Request} req
     * @param  {Response} response
     * @returns user details
     */
    @UseGuards(JwtAuthGuard)
    @Get("user-details")
    @ApiResponse({status: ResponseCode.SUCCESS, description: ResponseMessages.DATA_FOUND})
    @ApiResponse({status: ResponseCode.INTERNAL_SERVER_ERROR, description: ResponseMessages.INTERNAL_SERVER_ERROR})
    @ApiResponse({status: ResponseCode.UNAUTHORIZED, description: ResponseMessages.UNAUTHORIZED})
    async getAuthenticatedUserEmail(@Req() req: Request, @Res() response: Response): Promise<void> {
        try {
            this.mainService.sendResponse(response, ResponseMessages.DATA_FOUND, req.user, true, ResponseCode.SUCCESS);
        } catch (error) {
            this.logger.error(`${AuthController.name} : `, error);
            this.mainService.sendResponse(
                response,
                ResponseMessages.INTERNAL_SERVER_ERROR,
                error,
                false,
                error.status,
            );
        }
    }
}
