export function downloadUrlFile(url) {
  let a = document.createElement('a')
  a.style = 'display: none'
  a.download = true
  a.href = import.meta.env.DEV ? '/proxy-pattern' + url : url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
export function downloadBlobFile(blob, name) {
  const blobUrl = URL.createObjectURL(blob)
  let a = document.createElement('a')
  a.style = 'display: none'
  a.download = name || true
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
