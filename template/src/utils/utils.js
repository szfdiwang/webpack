/**
 * @author wangchenchen@myerong.com
 * @description 通用工具存放
 */

import {
  Message,
} from "element-ui"
const diffDate = function (start, end, boolean) {
  let d1 = new Date(start.replace(/\-/g, "/"));
  let d2 = new Date(end.replace(/\-/g, "/"));
  if ((boolean ? end : start) == "") {
    return true;
  } else {
    if (d1 > d2) {
      Message({
        type: "error",
        message: "开始时间不能大于结束时间!"
      });
      return false;
    } else {
      return true;
    }
  }
}

export {
  diffDate
};
