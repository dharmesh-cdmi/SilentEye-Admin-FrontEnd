import dayjs from 'dayjs';

export function formatDatewithTime(dateString) {
  return dayjs(dateString).format('MMM D, YYYY HH:mm');
}

export function formatDate(date){
  return dayjs(date).format('YYYY-MM-DD');
}