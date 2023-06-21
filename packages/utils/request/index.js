export function handleUrlUUID(url, data) {
  if (data.uuid) {
    return url + `/${data.uuid}`
  } else {
    return url
  }
}
