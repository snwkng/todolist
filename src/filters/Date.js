import moment from 'moment'

export const dateTime = (dateTime) => {
  if (!dateTime) return 'unknown date'
  return moment(dateTime).format('MMMM D, YYYY - HH:mm:ss')
}

export const time = (time) => {
  if (!time) return 'unknown time'
  return moment(time).format('HH:mm:ss')
}

export const date = (date) => {
  if (!date) return 'unknown date'
  return moment(date).locale('ru').format('LL')
}
