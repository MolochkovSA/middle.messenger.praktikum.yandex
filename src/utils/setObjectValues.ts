import { Indexed } from '@/types'
import { isObject } from '.'

export function setObjectValues<T extends Indexed>(lhs: T, rhs: DeepPartial<T>): T {
  const result: T = {} as T

  const keys = Object.keys(rhs)

  for (const key of keys) {
    const val1 = lhs[key]
    const val2 = rhs[key]

    if (isObject(val1) && isObject(val2)) {
      ;(result as Indexed)[key] = setObjectValues(val1, val2)
    } else {
      ;(result as Indexed)[key] = val2
    }
  }

  return result
}
