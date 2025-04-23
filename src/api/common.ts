import { http } from "@/utils/http";
import { ContentTypeEnum } from "@/enums/request-enum";
import { getUserToken } from "@/utils/common";
import { formDataHander } from "@pureadmin/utils";

type wxSignatureResult = {
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
};
/** 微信地址授权 */
export const getSignatureUrl = (): Promise<wxSignatureResult> => {
  return http.request({
    url: "/cloud2.member.api/member/userInfo/getJsApiTicket",
    method: "get",
    params: {
      url: window.location.href.split("#")[0],
      userToken: getUserToken()
    },
    headers: {
      notCatch: true
    }
  });
};

/** 小程序参数解码 */
export const decodeParams = (params: { context: string }): Promise<string> => {
  return http.request({
    url: "/cloud2.member.api/member/userInfo/decode",
    method: "post",
    data: formDataHander(params),
    headers: {
      "Content-Type": ContentTypeEnum.FORM_DATA,
      notCatch: true
    }
  });
};
