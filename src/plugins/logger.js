"use strict";
exports.__esModule = true;
var winston = require("winston");
var root = require("app-root-path");
var DailyRotateFile = require("winston-daily-rotate-file");
var createLogger = winston.createLogger, format = winston.format, transports = winston.transports;
var combine = format.combine, timestamp = format.timestamp, label = format.label, printf = format.printf;
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return timestamp + " [" + label + "] " + level + ": " + message;
});
var logger = createLogger({
    format: combine(label({ label: 'APPLICATION' }), timestamp(), myFormat),
    transports: [
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            filename: '%DATE%.log',
            dirname: root + "/logs/",
            utc: true,
            level: 'info'
        }),
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            filename: '%DATE%.err.log',
            dirname: root + "/logs/",
            utc: true,
            level: 'error'
        })
    ]
});
logger.add(new transports.Console({
    handleExceptions: true,
    format: format.combine(format.colorize({
        all: true
    }))
}));
exports["default"] = logger;
