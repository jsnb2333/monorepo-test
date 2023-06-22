import { createI18n } from 'vue-i18n';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';

import { genMessage } from './helpers';
import { rulesT } from './rulesT';
import { setI18nLocal, getI18nLocal } from './helpers';

const commonZhCN = import.meta.glob('./lang/zh-CN/*.json', { eager: true });
const commonEn = import.meta.glob('./lang/en/*.json', { eager: true });

const projectZhCN = import.meta.glob('@/locales/lang/zh-CN/*.json', {
  eager: true,
});
const projectEn = import.meta.glob('@/locales/lang/en/*.json', { eager: true });

const viewsZhCN = import.meta.glob('@/views/**/zh-CN/*.json', { eager: true });
const viewsEn = import.meta.glob('@/views/**/en/*.json', { eager: true });

const i18nLocal = getI18nLocal();
/**
 * dayjs字符串映射语言包。用于切换day和andt组件的语言。在需要在添加 https://unpkg.com/browse/ant-design-vue@3.2.17/es/locale/
 */
export const dayMap = {
  'zh-CN': zhCN,
  en: enUS,
};

/**
 * 汇总i18n的多语言文件对象
 */
export const messages = {
  'zh-CN': {
    ...genMessage(commonZhCN),
    ...genMessage(projectZhCN),
    ...genMessage(viewsZhCN),
  },
  en: {
    ...genMessage(commonEn),
    ...genMessage(projectEn),
    ...genMessage(viewsEn),
  },
};

//注册i8n实例并引入语言文件
export const i18n = createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  globalInjection: true,
  global: true,
  locale: i18nLocal,
  fallbackLocale: 'en',
  messages,
});

/**
 * 切换语言
 * @param {string} locale
 */
export function setLocale(locale) {
  // 组合式API需要.value
  i18n.global.locale.value = locale;
  dayjs.locale(dayMap[locale]);
  setI18nLocal(locale);
}

/**
 * 获取t函数，在js或ts文件使用多语言
 */
export function getT() {
  const { t } = i18n.global;
  return t;
}

// app设置i18n
export function setupI18n(app) {
  app.use(i18n);
}

// 设置rulesT到i18n实例对象上
rulesT(i18n);
