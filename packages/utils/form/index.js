export function recordFormatForm(params, formatFrom) {
  const record = { ...params }
  const from = Object.fromEntries(
    Object.entries(record).map((item) => {
      const [key, value] = item
      const { key: mapKey, value: mapValue } = formatFrom({ key, value, item: { key, value } })
      return [mapKey, mapValue]
    })
  )
  return from
}
