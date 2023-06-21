import { getT } from '@shared/service/locales'

import axios from 'axios'
import { message } from 'ant-design-vue'

import { MainStores } from './stores/mainStores'

const t = getT()

// 创建 axios 实例
const requestCase = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'X-Requested-With'
  },
  baseURL: import.meta.env.DEV ? '/proxy-pattern' : import.meta.env.VITE_BASEURL
})

requestCase.interceptors.request.use((config) => {
  // 全局过滤GET请求，无用查询参数，这样我们只需要设置为空值就不会作为查询参数
  // if (config.method === 'get' && config.params) {
  //   const _params = filterNullValueObject(config.params)
  //   config.params = _params
  // }
  return config
}, handleError)

requestCase.interceptors.response.use(
  (response) => {
    const { status, data } = response

    if (status === 204) {
      return response
    }
    if (status >= 200 && status < 300) {
      return data
    }

    return response
  },
  (error) => {
    if (error.response.status === 401) {
      const mainStores = MainStores()
      mainStores.clearUserAttestation()
      message.error(t('common.message.request.error'))
    }
    return Promise.reject(error)
  }
)

function handleError(error) {
  return Promise.reject(error)
}

export function filterNullValueObject(obj) {
  const result = {}
  if (obj && Object.keys(obj).length >= 1) {
    Object.keys(obj).forEach((key) => {
      if (key && obj[key] !== undefined && obj[key] !== '' && obj[key] !== null) {
        // 如果查询的条件不为空
        if (isArray(obj[key]) && obj[key].length === 0) {
          return
        }
        result[key] = obj[key]
      }
    })
  }
  return result // 返回查询条件
}

export default requestCase
