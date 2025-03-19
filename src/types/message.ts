import { ChatId } from './chat'
import { UserId } from './user'

export type MessageId = number

export enum MessageContentType {
  MESSAGE = 'message',
  FILE = 'file',
}

export type Message = {
  id: MessageId
  user_Id: UserId
  chat_Id: ChatId
  time: string
  type: MessageContentType
  contnet: string
}
