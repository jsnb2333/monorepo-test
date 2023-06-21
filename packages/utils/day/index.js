import dayjs from 'dayjs'

export function formatToMinute(params) {
  return dayjs(params).format('YYYY-MM-DD hh:mm') 
}

export function formatToDay(params) {
  return dayjs(params).format('YYYY-MM-DD') 
}