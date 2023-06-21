// import { getT } from "../locales";

import axios from "axios";

// const t = getT();

/**
 * 创建全局通用axios实例对象,已经调用函数
 * @returns
 */
function createAxiosInstance(createParams) {
  // 创建 axios 实例
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "X-Requested-With",
    },
    baseURL: import.meta.env.DEV
      ? "/proxy-pattern"
      : import.meta.env.VITE_BASEURL,
    ...createParams
  });

  instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么

    // 全局过滤GET请求，无用查询参数，这样我们只需要设置为空值就不会作为查询参数
    if (config.method === "get" && config.params) {
      const _params = filterNullValueObject(config.params);
      config.params = _params;
    }
    return config;
  }, handleError); // handleError 对请求错误做些什么

  instance.interceptors.response.use(
    (response) => {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      const { status, data } = response;

      // 204返回全部信息执行处理
      if (status === 204) {
        return response;
      }

      // 响应正常返回data
      if (status >= 200 && status < 300) {
        return data;
      }

      return response;
    },
    (error) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么

      // 401认证失效
      // if (error.response.status === 401) {
      //   return handleError(t("common.message.request.error"));
      // }
      return handleError(error.response.data);
    }
  );

  return instance;
}

function handleError(error) {
  // 返回Promise.reject()，触发外部的.catch。
  return Promise.reject(error);
}

/**
 * 过滤无效查询条件
 *
 * @param {object} obj
 * @returns new object
 */
function filterNullValueObject(obj) {
  if (!obj || Object.keys(obj).length === 0) {
    return {};
  }

  const result = {};

  for (let key in obj) {
    // 如果查询条件为空或者undefined/null/''，就忽略
    if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
      continue;
    }

    // 如果是数组类型的查询条件，且长度为0，就忽略
    if (Array.isArray(obj[key]) && obj[key].length === 0) {
      continue;
    }

    // 其他情况都当作有效查询条件
    result[key] = obj[key];
  }

  return result; // 返回查询条件
}

/**
 * 创建request函数
 *
 * @param {object} instance axios 实例
 * @returns 请求调用函数（request）
 */
function createRequest(instance, requestHeaders = () => ({})) {
  return (config = {}) => {
    if (Object.keys(config).length === 0) {
      throw new Error("request 函数没有配置");
    }

    const headers = requestHeaders(config);

    if (headers._error) {
      return Promise.reject({ message: headers._error });
    }

    return instance({
      ...config,
      headers: {
        ...headers,
        ...config?.headers,
      },
    });
  };
}

export { axios, createAxiosInstance, createRequest };
