import { logger } from '@/services'
import { EventBus } from './event-bus'

export enum WSEvents {
  CONNECT = 'connect',
  OPEN = 'open',
  CLOSE = 'close',
  MESSAGE = 'message',
  ERORR = 'error',
}

export class WSTransport extends EventBus {
  private _context = WSTransport.name + '.'
  private _socket: WebSocket
  private _pingInterval?: NodeJS.Timeout
  private _messageHandler: (data: unknown) => void

  constructor(url: string, messageHandler: (data: unknown) => void) {
    super()
    this._socket = new WebSocket(url)
    this._messageHandler = messageHandler
  }

  async connect(): Promise<void> {
    return new Promise((resolve) => {
      this.on(WSEvents.CONNECT, () => resolve())
      this._subscribe()
    })
  }

  disconnect(): void {
    this._clearPingInterval()
    this._unsubscribe()
    this._socket.close()
    this.clear()
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this._socket.send(data)
  }

  private _subscribe(): void {
    this._socket.addEventListener(WSEvents.OPEN, this._handleOpen.bind(this))
    this._socket.addEventListener(WSEvents.CLOSE, this._handleClose.bind(this))
    this._socket.addEventListener(WSEvents.MESSAGE, this._handleMessage.bind(this))
    this._socket.addEventListener(WSEvents.ERORR, this._handleError.bind(this))
  }

  private _unsubscribe(): void {
    this._socket.removeEventListener(WSEvents.OPEN, this._handleOpen.bind(this))
    this._socket.removeEventListener(WSEvents.CLOSE, this._handleClose.bind(this))
    this._socket.removeEventListener(WSEvents.MESSAGE, this._handleMessage.bind(this))
    this._socket.removeEventListener(WSEvents.ERORR, this._handleError.bind(this))
  }

  private _handleOpen(): void {
    this.emit(WSEvents.CONNECT)
    this._setPingInterval()
    logger.warn(this._context, 'Соединение установлено')
  }

  private _handleClose(event: CloseEvent): void {
    if (event.wasClean) {
      logger.warn(this._context, 'Соединение закрыто чисто')
    } else {
      logger.warn(this._context, 'Обрыв соединения')
      logger.warn(this._context, `Код: ${event.code} | Причина: ${event.reason}`)
    }
  }

  private _handleMessage(event: MessageEvent): void {
    this._messageHandler(event.data)
  }

  private _handleError(event: Event): void {
    logger.error(this._context, (event as ErrorEvent).message)
  }

  private _setPingInterval() {
    this._pingInterval = setInterval(() => {
      this._socket.send(JSON.stringify({ type: 'ping', content: '' }))
    }, 20000)
  }

  private _clearPingInterval() {
    if (this._pingInterval) {
      clearInterval(this._pingInterval)
    }
  }
}
