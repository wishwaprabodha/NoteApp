'use strict'

const winston = require('winston');

function dateFormat() {
    return new Date(Date.now()).toISOString()
}

class LoggerService {
    constructor(className) {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `./logs/note.log`
                })
            ],
            format: winston.format.printf((info) => {
                return`${dateFormat()} | ${info.level.toUpperCase()} | ${className} | ${info.message} `;
            })
        })
    }

    info(message, obj) {
        this.logger.log('info', message , {
            obj
        })
    };

    warn(message, obj) {
        this.logger.log('warn', message , {
            obj
        })
    };

    silly(message, obj) {
        this.logger.log('silly', message , {
            obj
        })
    };

    debug(message, obj) {
        this.logger.log('debug', message, {
            obj
        })
    }

    error(message, obj) {
        this.logger.log('error', message, {
            obj
        })
    }
}

module.exports = LoggerService;
