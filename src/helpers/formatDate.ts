import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function formatDate(date): string {
  return format(date, 'dd LLL yyyy', { locale: ptBR });
}

export default formatDate;
