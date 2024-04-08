import {Injectable, Logger} from "@nestjs/common";
import * as winston from 'winston';
import "winston-daily-rotate-file";

@Injectable()
export class WinstonService extends Logger{
    private readonly logger: winston.Logger;

    constructor() {

        super();
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(info => {
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                })
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '7d',
                }),
            ],
        });
    }

    /**
     * Info logs
     * @param {string} message
     */
    log(message: string) {
        super.log(message);
        this.logger.info(message);
    }

    /**
     * Error logs
     * @param {string} message
     * @param {string} trace
     */
    error(message: string, trace: string) {
        super.error(message, trace);
        this.logger.error(message, trace);
    }

    /**
     * Warn logs
     * @param {string} message
     */
    warn(message: string) {
        super.warn(message);
        this.logger.warn(message);
    }

    /**
     * Debug logs
     * @param {string} message
     */
    debug(message: string) {
        super.debug(message);
        this.logger.debug(message);
    }

    /**
     * Verbose logs
     * @param {string} message
     */
    verbose(message: string) {
        super.verbose(message);
        this.logger.verbose(message);
    }


}
