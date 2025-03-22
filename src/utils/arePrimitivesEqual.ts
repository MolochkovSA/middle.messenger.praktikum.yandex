type Primitives = string | number | boolean

export function arePrimitivesEqual(first: Primitives, second: Primitives): boolean {
  return first === second
}
