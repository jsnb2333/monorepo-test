import qs from 'qs'

export function stringifyArrayFormatRepeat(strUrl) {
  return qs.stringify(strUrl, {
    arrayFormat: 'repeat'
  })
}