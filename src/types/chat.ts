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

export type ChatUserDto = Pick<User, 'id' | 'first_name' | 'second_name' | 'login' | 'avatar' | 'display_name'>

export type ChatUser = Pick<User, 'id' | 'first_name' | 'second_name' | 'login'> &
  Required<Pick<User, 'avatar' | 'display_name'>>
