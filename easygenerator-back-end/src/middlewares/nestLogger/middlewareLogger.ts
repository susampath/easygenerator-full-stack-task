import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";
import {WinstonService} from "../../utils/logger/winston/winston.service";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    constructor(private readonly winstonLogger: WinstonService) {}

    /**
     * Middleware function to log request details.
     *
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The callback function to invoke the next middleware.
     * @returns {void}
     */
    use(request: Request, response: Response, next: NextFunction): void {
        const {ip, method, baseUrl} = request;
        const userAgent = request.get("user-agent") || "";
        const startTime = Date.now();

        response.on("close", () => {
            const {statusCode} = response;
            const contentLength = response.get("content-length");
            const duration = Date.now() - startTime;

            this.winstonLogger.log(
                `${method} ${baseUrl} ${statusCode} ${contentLength} ${duration}ms - ${userAgent} ${ip}`
            );
        });

        next();
    }
}
