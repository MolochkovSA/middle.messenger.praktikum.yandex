import { User } from '@/types/user'
import { isObject } from './isObject'

export function isUser(user: unknown): user is User {
  if (!isObject(user)) return false

  return (
    'id' in user &&
    'first_name' in user &&
    'second_name' in user &&
    'phone' in user &&
    'login' in user &&
    'email' in user
  )
}
