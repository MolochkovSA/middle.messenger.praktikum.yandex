import { LOG_LEVEL } from '@/config/constants'
import { isObject } from '@/utils'

enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

type LogMethod = typeof console.log

class LoggerService {
  constructor(private _logLevel: LogLevel) {}

  private _log(context: string, level: LogLevel, method: LogMethod, ...messages: unknown[]) {
    if (level <= this._logLevel) {
      const data = messages.map((message) => {
        if (isObject(message)) {
          return JSON.stringify(message, null, 2)
        }
        return message
      })

      method(`[${LogLevel[level]}] ${context}: ${data}`)
    }
  }

  private _createMethod(level: LogLevel, method: LogMethod) {
    return (context: string, ...messages: unknown[]) => this._log(context, level, method, ...messages)
  }

  error = this._createMethod(LogLevel.ERROR, console.error)
  warn = this._createMethod(LogLevel.WARN, console.warn)
  info = this._createMethod(LogLevel.INFO, console.log)
  debug = this._createMethod(LogLevel.DEBUG, console.log)
}

export const logger = new LoggerService(LOG_LEVEL)
