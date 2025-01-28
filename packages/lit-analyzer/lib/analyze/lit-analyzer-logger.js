"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLitAnalyzerLogger = exports.LitAnalyzerLoggerLevel = void 0;
var LitAnalyzerLoggerLevel;
(function (LitAnalyzerLoggerLevel) {
    LitAnalyzerLoggerLevel[LitAnalyzerLoggerLevel["OFF"] = 0] = "OFF";
    LitAnalyzerLoggerLevel[LitAnalyzerLoggerLevel["ERROR"] = 1] = "ERROR";
    LitAnalyzerLoggerLevel[LitAnalyzerLoggerLevel["WARN"] = 2] = "WARN";
    LitAnalyzerLoggerLevel[LitAnalyzerLoggerLevel["DEBUG"] = 3] = "DEBUG";
    LitAnalyzerLoggerLevel[LitAnalyzerLoggerLevel["VERBOSE"] = 4] = "VERBOSE";
})(LitAnalyzerLoggerLevel || (exports.LitAnalyzerLoggerLevel = LitAnalyzerLoggerLevel = {}));
class DefaultLitAnalyzerLogger {
    level = LitAnalyzerLoggerLevel.OFF;
    /**
     * Logs if this.level >= DEBUG
     * @param args
     */
    debug(...args) {
        this.log(LitAnalyzerLoggerLevel.DEBUG, ...args);
    }
    /**
     * Logs if this.level >= ERROR
     * @param args
     */
    error(...args) {
        this.log(LitAnalyzerLoggerLevel.ERROR, ...args);
    }
    /**
     * Logs if level >= WARN
     * @param args
     */
    warn(...args) {
        this.log(LitAnalyzerLoggerLevel.WARN, ...args);
    }
    /**
     * Logs if level >= VERBOSE
     * @param args
     */
    verbose(...args) {
        this.log(LitAnalyzerLoggerLevel.VERBOSE, ...args);
    }
    log(level, ...args) {
        // Only log for the set level
        if (level > this.level) {
            return;
        }
        const prefix = `[${this.severityPrefix(level)}]`;
        switch (level) {
            case LitAnalyzerLoggerLevel.VERBOSE:
                // eslint-disable-next-line no-console
                console.log(prefix, ...args);
                return;
            case LitAnalyzerLoggerLevel.DEBUG:
                // eslint-disable-next-line no-console
                console.debug(prefix, ...args);
                return;
            case LitAnalyzerLoggerLevel.WARN:
                // eslint-disable-next-line no-console
                console.warn(prefix, ...args);
                return;
            case LitAnalyzerLoggerLevel.ERROR:
                // eslint-disable-next-line no-console
                console.error(prefix, ...args);
                return;
            case LitAnalyzerLoggerLevel.OFF:
                return;
        }
    }
    severityPrefix(level) {
        switch (level) {
            case LitAnalyzerLoggerLevel.VERBOSE:
                return "\x1b[36mVERBOSE\x1b[0m"; // CYAN
            case LitAnalyzerLoggerLevel.DEBUG:
                return "\x1b[33mDEBUG\x1b[0m"; // YELLOW
            case LitAnalyzerLoggerLevel.WARN:
                return "\x1b[35mWARN\x1b[0m"; // PURPLE
            case LitAnalyzerLoggerLevel.ERROR:
                return "\x1b[31mERROR\x1b[0m"; // RED
            case LitAnalyzerLoggerLevel.OFF:
                return "";
        }
    }
}
exports.DefaultLitAnalyzerLogger = DefaultLitAnalyzerLogger;
//# sourceMappingURL=lit-analyzer-logger.js.map