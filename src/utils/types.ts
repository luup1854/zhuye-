export type WxUserInfo = {
  userToken: string;
  phone?: string;
  identity: string; //  vip |  visitor
  comId?: number;
  status?: number;
  uid?: number;
  nickname?: string;
  longitude?: number;
  latitude?: number;
  headImgUrl?: string;
};
