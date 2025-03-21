import { Chat } from '@/types/chat'

export type MappedChatItem = Pick<Chat, 'id' | 'title' | 'avatar' | 'unread_count'> & {
  isActive: boolean
  messageText: string
  messageDate: string
  isMyMessage: boolean
}
