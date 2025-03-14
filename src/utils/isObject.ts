import { Indexed } from '@/types'

export function isObject(obj: unknown): obj is Indexed {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date)
}
