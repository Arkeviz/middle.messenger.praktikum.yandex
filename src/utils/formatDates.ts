export const formatChatDate = (isoDate: string): string => {
  const date = new Date(isoDate)
  const now = new Date()

  const sameDay = date.toDateString() === now.toDateString()
  const isSameYear = date.getFullYear() === now.getFullYear()

  const dateDayStart = new Date(date)
  dateDayStart.setHours(0, 0, 0, 0)
  const nowDayStart = new Date(now)
  nowDayStart.setHours(0, 0, 0, 0)
  const daysDiff = Math.floor(
    (nowDayStart.getTime() - dateDayStart.getTime()) / 86400000,
  )

  if (sameDay) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (daysDiff <= 6) {
    return date.toLocaleDateString('ru-RU', { weekday: 'short' })
  }

  if (isSameYear) {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    })
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
