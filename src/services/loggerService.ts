import { LOG_LEVEL } from '@/config/constants'

enum LogLevel {
  NONE = 0,
  ERROR = 1,
  INFO = 2,
  DEBUG = 3,
}

type LogMethod = typeof console.log

class LoggerService {
  constructor(private _logLevel: LogLevel) {}

  private _log(context: string, message: unknown, level: LogLevel, method: LogMethod) {
    if (level <= this._logLevel) {
      method(`[${LogLevel[level]}] ${context}: ${message}`)
    }
  }

  private _createMethod(level: LogLevel, method: LogMethod) {
    return (context: string, message: unknown) => this._log(context, message, level, method)
  }

  error = this._createMethod(LogLevel.ERROR, console.error)
  info = this._createMethod(LogLevel.INFO, console.log)
  debug = this._createMethod(LogLevel.DEBUG, console.log)
}

export const logger = new LoggerService(LOG_LEVEL)
