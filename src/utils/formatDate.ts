export function formatDate(date: string): string {
  const targetDate = new Date(date)
  const currentDate = new Date()

  const oneDay = 24 * 60 * 60 * 1000

  if (currentDate.getTime() - targetDate.getTime() < oneDay) {
    return targetDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  } else {
    return targetDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
  }
}
