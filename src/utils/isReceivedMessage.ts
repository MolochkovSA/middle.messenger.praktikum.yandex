import { ReceivedMessage } from '../types/message'
import { isObject } from './isObject'

export function isReceivedMessage(message: unknown): message is ReceivedMessage {
  if (!isObject(message)) return false

  return (
    typeof message.id === 'number' &&
    typeof message.user_id === 'number' &&
    typeof message.content === 'string' &&
    typeof message.time === 'string'
  )
}
