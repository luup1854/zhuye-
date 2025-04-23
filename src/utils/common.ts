import { decodeParams, getSignatureUrl } from "@/api/common";
import { getActInfoJson } from "@/api/activity";
import { getUrlParams } from "@/utils/tools";
import { PRODUCT } from "@/config";
import { storageLocal } from "@pureadmin/utils";
import { showToast } from "vant";
import Base64 from "@/utils/base64";
import type { WxUserInfo } from "./types";
import gotoMiniProgram from "./gotoMiniProgram";

/** 解密小程序带过的data */
export const decodeParamsByXcxData = async () => {
  try {
    const params = {
      context: getUrlParams("xcxData") as string
    };
    const data = await decodeParams(params);
    wxLoginData().set(JSON.parse(data));
  } catch ({ msg }) {
    showToast({
      message: msg,
      onClose: () => {
        gotoMiniProgram("login");
      }
    });
    // showToast(error);
  }
};

export const wxLoginData = () => {
  const pName = storageLocal().getItem("product") || PRODUCT;
  const get = () => {
    return storageLocal().getItem<WxUserInfo>(`${pName}wxLogin`);
  };
  const set = data => {
    storageLocal().setItem<WxUserInfo>(`${pName}wxLogin`, data);
  };
  return { get, set };
};

/** 获取用户 token */
export const getUserToken = () => {
  const data = wxLoginData().get();
  return data?.userToken;
};

/** 微信授权 */
export const wxConfig = async (jsApiList: string[], callback?: Function) => {
  try {
    const data = await getSignatureUrl();

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId || process.env.VUE_APP_WAPPID, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(() => {
      if (callback) {
        callback();
      }
    });
  } catch ({ msg }) {
    showToast({
      message: msg,
      onClose: () => {
        gotoMiniProgram("login");
      }
    });
  }
};

/** 设置分享 */
export const setMiniProgramShare = async ({ title, path, imageUrl }) => {
  const result = await getMiniEnv();
  if (result) {
    wx.miniProgram.postMessage({
      data: {
        title,
        path,
        imageUrl
      }
    });
  }
};

/** 获取小程序环境 */
export const getMiniEnv = () => {
  return new Promise(resolve => {
    wx.miniProgram.getEnv(async res => {
      if (res.miniprogram) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

/** 获取活动json */
export const getActJsonData = async id => {
  const res: any = await getActInfoJson(id);
  if (res.consumerJson) {
    try {
      const jsonData = JSON.parse(Base64.decode(res.consumerJson));
      storageLocal().setItem("actJson", jsonData);
      return jsonData;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
