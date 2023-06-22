import { getT } from '@shared/service/locales';

import { message } from 'ant-design-vue';

import requestCase from './requestCase';
import { MainStores } from './stores/mainStores';

const t = getT();

/**
 * 配置拦截提供默认配置
 *
 * @param config
 * @returns
 */
export async function request(config) {
  const mainStores = MainStores();
  if (!mainStores.token) {
    message.error(t('common.message.request.error'));
    return Promise.reject({ message: t('common.message.request.error') });
  }
  return requestCase({
    ...config,
    headers: {
      Authorization: `Bearer ${mainStores.token}`,
      ...config?.headers,
    },
  });
}

/**
 * 不需要token的接口
 *
 * @param config
 * @returns
 */
export function api(config) {
  return requestCase(config);
}

/**
 * 拿到最新，动态domainId
 *
 * @param  cd
 * @returns
 */
export function requestDomainId(cd) {
  const domainId = getDomainId();
  const config = cd(domainId);

  return request(config);
}

/**
 * 获取getDomainId
 *
 * @returns
 */
export function getDomainId() {
  const main = MainStores();
  return main.domainId;
}

/**
 * 获取getToken
 *
 * @returns
 */
export function getToken() {
  return getTokenCookie();
}
