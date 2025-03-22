import { logger } from '@/services'
import { WSTransport } from '@/core/WSTransport'
import { BASE_WS_URL } from '@/config/constants'
import { Message, NewMessageDto } from '@/types/message'
import { isMessage, isReceivedMessage } from '@/utils'
import { dispatch } from '@/store'
import { messageActions } from '@/store/massage'
import { ChatId } from '@/types/chat'

class MessageController {
  private _ws?: WSTransport
  private _context = MessageController.name + '.'
  private _chatId?: ChatId

  constructor() {}

  async connect({ userId, chatId, token }: { userId: number; chatId: number; token: string }): Promise<void> {
    this._chatId = chatId
    const url = `${BASE_WS_URL}/chats/${userId}/${chatId}/${token}`

    this._ws?.disconnect()
    this._ws = new WSTransport(url, this.receiveMessage.bind(this))

    await this._ws.connect()

    logger.warn(this._context, `Connected to ${userId}/${chatId}`)
  }

  receiveMessage(data: unknown): void {
    if (typeof data !== 'string') {
      return logger.error(this._context, 'Received message is not a string')
    }

    const json = JSON.parse(data as string)

    if (json.type === 'pong') {
      return
    } else if (isMessage(json)) {
      console.log('message', json)
    } else if (Array.isArray(json) && json.every(isMessage)) {
      dispatch(messageActions.setMessages(json))
    } else if (isReceivedMessage(json)) {
      const message: Message = { ...json, is_read: false, chat_id: this._chatId! }
      dispatch(messageActions.addMessages([message]))
    }
  }

  sendMessage(message: string): void {
    this._send({ content: message, type: 'message' })
  }

  loadOldMessages(): void {
    this._send({ content: '0', type: 'get old' })
  }

  private _send(data: NewMessageDto): void {
    const message = JSON.stringify(data)
    this._ws?.send(message)

    logger.debug(this._context, message)
  }
}

export const messageController = new MessageController()
