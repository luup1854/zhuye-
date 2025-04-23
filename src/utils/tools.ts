import { getQueryMap } from "@pureadmin/utils";

/**
 * 获取 URL 参数。
 * @param key 可选参数。要获取的参数名称。
 * @returns 如果提供了参数名称，则返回对应的参数值。如果未提供参数名称，则返回所有参数的对象。
 */
export const getUrlParams = (
  key?: string
): string | Record<string, string> | any => {
  const params = getQueryMap(window.location.href);

  if (key) {
    return params[key] || null;
  }
  return params;
};
