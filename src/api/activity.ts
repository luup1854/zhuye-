import { http } from "@/utils/http";
import { getUserToken } from "@/utils/common";

export type ActDetail = {
  freeActivityId: number;
  freeChanceLimit: number;
  isGetFirstJoinChance: boolean; // 是否首页参加
  limitPointsScore: number;
  maxScoreLimit: number; // 可抽奖分数限制
  neededPoints: number; // 兑换所需积分
  neededPointsLimit: number; // 每天最高兑换次数
  register: number; // 每天可邀请注册次数
  remainChanceTimes: number; // 剩余抽奖次数
  share: number; // 每天可分享次数
  surplusFreeChance: number; // 免费机会的机会
  surplusPointsChance: number; // 剩余抽奖次数
  useRegister: number; // 已经邀请
  useShare: number; // 已分享次数
  userPoint: number; // 用户积分
};

/** 获取活动信息JSON */
export const getActInfoJson = (id: string) => {
  return http.request({
    url: "/cloud2.activity.api/market/activity/queryActivityInfo",
    method: "get",
    params: {
      id,
      userToken: getUserToken()
    }
  });
};

/** 获取活动信息 */
export const getActInfo = (
  activityId: string
): Promise<{ etime: number; stime: number; status: number }> => {
  return http.request({
    url: "/cloud2.activity.api/common/queryActivity/queryActivityInfo",
    method: "get",
    params: {
      activityId,
      userToken: getUserToken()
    }
  });
};

/** 获取活动和用户详细信息 */
export const getActAndUserDetail = (activityId: string): Promise<ActDetail> => {
  return http.request({
    url: "/cloud2.activity.api/common/queryActivity/queryActivityUserInfoDetail",
    method: "get",
    params: {
      activityId,
      userToken: getUserToken()
    }
  });
};

/** 兑换游戏机会接口 */
export const pointExchangeChance = (activityId: string, source: string) => {
  return http.request({
    url: "/cloud2.activity.api/common/activity/pointExchangeChance",
    method: "get",
    params: {
      activityId,
      userToken: getUserToken(),
      source
    },
    headers: {
      notCatch: true
    }
  });
};

/** 开始游戏接口 */
export const openGame = (activityId: string) => {
  return http.request({
    url: "/cloud2.activity.api/common/activity/openGame",
    method: "post",
    data: {
      activityId,
      userToken: getUserToken()
    }
  });
};

type endGameParams = {
  activityId: string;
  source?: string;
  gameId?: number;
  point?: number;
  lng?: number;
  lat?: number;
  chanceSource?: string;
};

/** 结束游戏接口 */
export const endGame = (params: endGameParams) => {
  return http.request({
    url: "/cloud2.activity.api/common/activity/endGame",
    method: "post",
    data: {
      userToken: getUserToken(),
      ...params
    },
    headers: {
      notCatch: true
    }
  });
};

/** 获取分享信息 */
export const getShareInfo = (
  activityId: string,
  source: string
): Promise<{ shareId: number }> => {
  return http.request({
    url: "/cloud2.activity.api/common/activity/getShareInfo",
    method: "get",
    params: {
      activityId,
      source,
      userToken: getUserToken()
    }
  });
};

// 活动信息接口
// /cloud2.activity.api/common/queryActivity/queryActivityUserInfoDetail
// 兑换游戏机会接口
// /cloud2.activity.api/common/activity/pointExchangeChance
// 开始游戏接口
// /cloud2.activity.api/common/activity/openGame
// 结束游戏接口
// /api/cloud2.activity.api/common/activity/endGame
