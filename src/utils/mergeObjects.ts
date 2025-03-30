import { Indexed } from '../types'
import { isObject } from '.'

export function mergeObjects<T extends Indexed>(lhs: T, rhs: Indexed): T {
  const result: T = {} as T

  const keys = Object.keys({ ...lhs, ...rhs })

  for (const key of keys) {
    const val1 = lhs[key]
    const val2 = rhs[key]

    if (isObject(val1) && isObject(val2)) {
      ;(result as Indexed)[key] = mergeObjects(val1, val2)
    } else {
      ;(result as Indexed)[key] = val2 !== undefined ? val2 : val1
    }
  }

  return result
}
