import { User } from '@/types/user'
import { isObject } from './isObject'

export function isUser(user: unknown): user is User {
  if (!isObject(user)) return false

  return (
    typeof user.id === 'number' &&
    typeof user.first_name === 'string' &&
    typeof user.second_name === 'string' &&
    typeof user.phone === 'string' &&
    typeof user.login === 'string' &&
    typeof user.email === 'string'
  )
}
