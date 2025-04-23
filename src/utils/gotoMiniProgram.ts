// 页面映射表
const pagesMap = {
  login: "/pages/login/login",
  back: "navigateBack"
};

// 跳转类型
const navigationFn = [
  "navigateTo",
  "redirectTo",
  "reLaunch",
  "switchTab",
  "navigateBack"
];

/** 小程序公共跳转 */
const gotoMiniProgram = (name: string, type?: string) => {
  if (name == "back") {
    wx.miniProgram.navigateBack();
    return;
  }
  if (!pagesMap[name]) {
    // 如果页面不存在，抛出错误
    throw new Error(`该页面不存在: ${name}`);
  }
  // 检查跳转类型是否存在
  if (type && !navigationFn.includes(type)) {
    throw new Error(`该跳转类型不存在: ${type}`);
  }
  wx.miniProgram[type || "reLaunch"]({
    url: pagesMap[name]
  });
};

export default gotoMiniProgram;
