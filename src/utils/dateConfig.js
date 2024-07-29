import dayjs from 'dayjs';

export function formatDate(dateString) {
  return dayjs(dateString).format('MMM D, YYYY HH:mm');
}
