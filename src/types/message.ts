import { ChatId } from './chat'
import { UserId } from './user'

export type MessageId = number

export enum MessageType {
  MESSAGE = 'message',
  FILE = 'file',
}

export type Message = {
  id: MessageId
  user_Id: UserId
  chat_Id: ChatId
  tyme: string
  type: MessageType
  contnet: string
}
