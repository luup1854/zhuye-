const isTestEnvironment = window.location.hostname.includes("gs-test");

export const getAidConfig = () => {
  if (isTestEnvironment) {
    return {
      throwPot: "460",
      pintu: "453",
      ninebox: "454"
    };
  } else {
    // 生产环境中的aid值为空，等到上线后再配置
    return {
      throwPot: "455",
      pintu: "454",
      ninebox: "453"
    };
  }
};
