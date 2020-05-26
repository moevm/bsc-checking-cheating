import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export default function formatDate(dateString: string) {
  return format(new Date(dateString), 'dd-MMMM-yyyy', {
    locale: ru
  })
}
