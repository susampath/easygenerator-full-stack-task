import {Controller, Get, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";

import {MainService} from "../../../utils/responseHandler/main.service";
import {ResponseCode} from "../../../constants/response.codes";
import {WinstonService} from "../../../utils/logger/winston/winston.service";
import {Connection} from "mongoose";
import {InjectConnection} from "@nestjs/mongoose";

@Controller('common')
export class CommonController {

    constructor(
        @InjectConnection() private readonly connection: Connection,
        private mainsService: MainService,
        private readonly logger: WinstonService
    ) {}

    /**
     * Health Check end point
     * @param {Request} request
     * @param {Response} response
     */
    @Get("health-check")
    async healthCheck(@Req() request: Request, @Res() response: Response) :Promise<void> {
        try {
            if (this.connection.readyState === 1) {
                this.mainsService.sendResponse(
                    response,
                    "Microservice healthy!",
                    {
                        mongoConnection: "success",
                    },
                    true,
                    ResponseCode.SUCCESS,
                    ResponseCode.SUCCESS
                );
            } else {
                this.mainsService.sendResponse(
                    response,
                    "Microservice unhealthy!",
                    {
                        mongoConnection: "false",
                        connectionStatus: this.connection.readyState,
                    },
                    true,
                    ResponseCode.SUCCESS,
                    ResponseCode.SUCCESS
                );
                this.logger.warn(`${CommonController.name} ==> :  Micro service not healthy`)

            }
        } catch (error) {
            this.logger.error(`${CommonController.name} ==> : `,error)

            this.mainsService.sendResponse(
                response,
                "Microservice unhealthy!",
                {},
                false,
                ResponseCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}
