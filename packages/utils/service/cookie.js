/**
 * 获取cookie中的数据
 *
 * @param {*} name
 * @returns
 */
export function getCookie(name) {
  const allCookie = document.cookie.split(';').map((item) => {
    const str = item.trim();
    const [key, value] = str.split('=');
    return { key, value };
  });
  if (name) {
    return allCookie.find((item) => item.key === name)?.value;
  } else {
    return allCookie;
  }
}

/**
 * 设置cookie中的数据，即添加删除修改
 *
 * @param {*} name
 * @param {*} value
 */
export function setCookie(name, value) {
  document.cookie = `${name}=${value}`;
}
/**
 * 设置token，和过期时间
 *
 * @param {*} value
 * @param {*} expires
 */
export function setTokenCookie(value = '', expires) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + expires);
  // encodeURIComponent转成可以储存的字符串
  const newValue = encodeURIComponent(value);
  document.cookie = `token=${newValue};expires=${now.toUTCString()}`;
}

/**
 * 获取token
 *
 * @returns
 */
export function getTokenCookie() {
  // decodeURIComponent转成普通字符串
  return decodeURIComponent(getCookie('token') || '');
}
