import { User, UserId } from './user'

export type ChatId = number

export type Chat = {
  id: ChatId
  title: string
  create_by: UserId
  avatar: string | null
  unread_count: number
  last_message: {
    user: User
    time: string
    content: string
  } | null
}

export type NewChatDto = Pick<Chat, 'title'>
