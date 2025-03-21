import { logger } from '@/services'
import { WSTransport } from '@/core/WSTransport'
import { BASE_WS_URL } from '@/config/constants'
import { NewMessageDto } from '@/types/message'
import { isMessage } from '@/utils/isMessage'

class MessageController {
  private _ws?: WSTransport
  private _context = MessageController.name + '.'

  constructor() {}

  async connect({ userId, chatId, token }: { userId: number; chatId: number; token: string }): Promise<void> {
    const url = `${BASE_WS_URL}/chats/${userId}/${chatId}/${token}`

    this._ws?.disconnect()
    this._ws = new WSTransport(url, this.receiveMessage.bind(this))

    await this._ws.connect()

    logger.warn(this._context, `Connected to ${userId}/${chatId}`)
  }

  sendMessage(data: NewMessageDto): void {
    const message = JSON.stringify(data)
    this._ws?.send(message)

    logger.debug(this._context, message)
  }

  receiveMessage(data: unknown): void {
    if (typeof data !== 'string') {
      return logger.error(this._context, 'Received message is not a string')
    }

    const json = JSON.parse(data as string)

    if (json.type === 'pong') {
      return
    } else if (isMessage(json)) {
      console.log('message', JSON.parse(data as string))
    } else if (Array.isArray(json) && json.every(isMessage)) {
      console.log('message[]', JSON.parse(data as string))
    }
  }

  loadOldMessages(): void {
    this.sendMessage({ content: '0', type: 'get old' })
  }
}

export const messageController = new MessageController()
