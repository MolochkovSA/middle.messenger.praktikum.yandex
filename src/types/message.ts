import { ChatId } from './chat'
import { UserId } from './user'

export type MessageId = number

export type Message = {
  id: MessageId
  user_id: UserId
  chat_id: ChatId
  type: 'message' | 'file'
  content: string
  time: string
  is_read: boolean
}

export type ReceivedMessage = Pick<Message, 'id' | 'user_id' | 'type' | 'content' | 'time'>

export type NewMessageDto = { content: string; type: 'get old' | 'message' | 'file' }
