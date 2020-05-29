import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export default function formatDate(dateString: string) {
  return format(new Date(dateString), 'HH:MM dd.MM.yyyy', {
    locale: ru
  })
}
