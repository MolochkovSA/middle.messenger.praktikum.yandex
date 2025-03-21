export function getAnotherDate(lhs: string, rhs?: string): string | undefined {
  const ldate = new Date(lhs)

  if (!rhs) return ldate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).split(' 2')[0]

  const rdate = new Date(rhs)

  if (ldate.getDate() === rdate.getDate()) return undefined

  return ldate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).split(' 2')[0]
}
