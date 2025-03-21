import { Chat } from '@/types/chat'
import { isObject } from './isObject'

export function isChat(chat: unknown): chat is Chat {
  if (!isObject(chat)) return false

  return (
    typeof chat.id === 'number' &&
    typeof chat.title === 'string' &&
    typeof chat.created_by === 'number' &&
    typeof chat.unread_count === 'number'
  )
}
