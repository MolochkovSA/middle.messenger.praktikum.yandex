import { isObject } from './isObject'
import { ChatUser } from '@/types/chat'

export function isChatUser(user: unknown): user is ChatUser {
  if (!isObject(user)) return false

  return (
    typeof user.id === 'number' &&
    typeof user.first_name === 'string' &&
    typeof user.second_name === 'string' &&
    typeof user.login === 'string'
  )
}
