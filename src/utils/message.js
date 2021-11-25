// 导入
import { Message } from "element-ui";
import { isEmpty, isObject, isUndefined } from "@qingbing/helper";

/**
 * 统一提示信息
 *
 * @param {object} options 提示选项
 */
function output(options) {
  isUndefined(options.duration) && (options.duration = 2000);
  Message(options);
}

/**
 * 成功通知
 *
 * @param {string} message 提示消息
 * @param {object} options 提示选项
 */
export function success(message, options) {
  isObject(options) || (options = {});
  options.message = isEmpty(message) ? "操作成功" : message;
  options.type = "success";
  output(options);
}

/**
 * 警告通知
 *
 * @param {string} message 提示消息
 * @param {object} options 提示选项
 */
export function warning(message, options) {
  isObject(options) || (options = {});
  options.message = isEmpty(message) ? "操作失败" : message;
  options.type = "warning";
  output(options);
}

/**
 * 消息通知
 *
 * @param {string} message 提示消息
 * @param {object} options 提示选项
 */
export function info(message, options) {
  if (isEmpty(message)) {
    return;
  }

  isObject(options) || (options = {});
  options.message = message;
  options.type = "info";
  output(options);
}

/**
 * 错误通知
 *
 * @param {string} message 提示消息
 * @param {object} options 提示选项
 */
export function error(message, options) {
  if (isEmpty(message)) {
    return;
  }

  isObject(options) || (options = {});
  options.message = message;
  options.type = "error";
  output(options);
}
