import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export const formatDate = (date: string) =>
  format(new Date(date), 'dd.MM.yyyy', {
    locale: ru
  })

export const formatTime = (date: string) =>
  format(new Date(date), 'HH:MM', {
    locale: ru
  })
