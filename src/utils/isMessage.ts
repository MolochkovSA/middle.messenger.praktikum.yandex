import { Message } from '../types/message'
import { isObject } from './isObject'

export function isMessage(message: unknown): message is Message {
  if (!isObject(message)) return false

  return (
    typeof message.id === 'number' &&
    typeof message.user_id === 'number' &&
    typeof message.chat_id === 'number' &&
    typeof message.content === 'string' &&
    typeof message.time === 'string' &&
    typeof message.is_read === 'boolean'
  )
}
