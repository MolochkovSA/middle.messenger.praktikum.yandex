export function areObjectsEqual(first: object, second: object): boolean {
  if (first === second) return true

  if (first === null || second === null) return false

  const first_keys: string[] = Object.getOwnPropertyNames(first)

  const second_keys: string[] = Object.getOwnPropertyNames(second)

  if (first_keys.length !== second_keys.length) return false

  for (const key of first_keys) {
    if (!Object.hasOwn(second, key)) return false

    const first_value = first[key as keyof typeof first]
    const second_value = second[key as keyof typeof second]

    if (typeof first_value !== typeof second_value) return false

    if (typeof first_value === 'object') {
      if (areObjectsEqual(first_value, second_value) === false) return false
    } else {
      if (first_value !== second_value) return false
    }
  }

  return true
}
