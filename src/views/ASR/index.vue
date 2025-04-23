<template>
  <div
    class="relative h-full select-none overflow-hidden font-medium base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/act-bg.jpg)]"
  >
    <template v-if="gameStatus == 0">
      <div
        class="back w-[57px] h-[34px] absolute left-0 top-[16px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/page-back.png)]"
        @click="gotoMiniProgram('back')"
      />
      <div
        class="share w-[32px] h-[98px] absolute right-[7px] top-[56px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-share.png)]"
        @click="showShare = !showShare"
      />
      <div
        class="my-prize w-[67px] h-[62px] absolute right-[5px] top-[626px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/my-prize.png)]"
        @click="goMyPrizePage"
      />
      <div
        class="rules w-[32px] h-[98px] absolute right-[7px] top-[158px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-rule.png)]"
        @click="showRule"
      />
    </template>
    <div
      class="content-box w-[258px] h-[156px] mx-auto mt-[240px] overflow-hidden base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/title-bg.png)]"
    >
      <div
        class="title w-[53px] h-[21px] bg-[#8659F1] rounded-[11px] text-[14px] flex items-center justify-center text-white mt-[21px] mx-auto"
      >
        标语
      </div>
      <div class="text text-[#48189B] text-[14px] text-center mt-[14px]">
        {{ currText }}
      </div>
      <div
        class="change-btn w-[193px] h-[40px] mx-auto mt-[14px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-change.png)]"
        @click="getRandomIndex"
      />
    </div>
    <div
      class="voice-btn w-[183px] h-[47px] mt-[145px] mx-auto base-bg"
      :class="
        gameStatus == 0
          ? 'bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-join-act.png)]'
          : 'bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-speech.png)]'
      "
      @touchstart="startRecording"
      @touchend="stopRecording"
      @click="showExchangePop"
    />
    <div
      class="tip text-center text-[#6250E2] text-[12px] mt-[16px] leading-5"
      :class="{ 'opacity-0': gameStatus < 1 }"
    >
      温馨提示 <br />
      长按“语音识别”按钮 <br />
      说出页面提供的“标语”即可获得1次抽奖机会哦！
      <div class="source text-[#C848A1] mt-[4px] mb-[39px]">
        “标语”来源：LZ飞天
      </div>
    </div>
    <!-- 录音 -->
    <RecordCountDownPop
      ref="countDownPopRef"
      :actInfo="activityInfo"
      :text="currText"
      @change="handleRecordStatus"
    />
    <!-- 海报 -->
    <Poster
      ref="posterRef"
      :gameStatus="gameStatus"
      :aid="route.query.aid"
      @on-draw="gameEnd"
      @back="closePoster"
    />
    <!-- 弹窗 -->
    <CommonPop
      ref="commonPopRef"
      :actInfo="activityInfo"
      @btn-click="handleBtnClick"
    />
    <!-- 其他弹窗 -->
    <OtherPop
      ref="otherPopRef"
      :ruleText="ruleText"
      @btn-click="handleOtherBtnClick"
    />

    <!-- 分享 -->
    <van-overlay :show="showShare" @click="showShare = !showShare">
      <div class="w-[80%] mx-auto mt-[10%]">
        <img
          class="w-1/2 ml-[50%]"
          src="https://gszy-oss.baijqr.cn/image/orn/company/picture/20240902170141684-73.png"
          alt=""
        />
      </div>
    </van-overlay>
  </div>
</template>
<script setup lang="ts">
import {
  onMounted,
  ref,
  shallowRef,
  computed,
  onBeforeMount,
  nextTick
} from "vue";
import { useRoute } from "vue-router";
import { wxConfig, setMiniProgramShare } from "@/utils/common";
import { pinyin } from "pinyin-pro";
import {
  getActInfo,
  getActAndUserDetail,
  pointExchangeChance,
  openGame,
  endGame,
  getShareInfo,
  getActInfoJson,
  type ActDetail
} from "@/api/activity";
import { showToast } from "vant";
import { getUrlParams } from "@/utils/tools";
import RecordCountDownPop from "./recordCountDownPop.vue";
import Poster from "./poster.vue";
import CommonPop from "./commonPop.vue";
import OtherPop from "./otherPop.vue";
import gotoMiniProgram from "@/utils/gotoMiniProgram";
import { wxLoginData } from "@/utils/common";

type GameData = {
  gameId: number;
  pointConfig: number;
  isFree: boolean;
};

let timer: any;

const sourceId = "20250227";

const route = useRoute();

const textArr = [
  "新工艺新科技，新质生产力",
  "抽新尚，有料更甜润",
  "品新尚，劲足更润滑",
  "选新尚，实在更有面",
  "微生物调香师，带来甜润新风味"
];

const textIndex = ref<number>();

const showShare = ref<boolean>(false);

// 活动信息
const actStatus = ref<number>();
const aid = route.query.aid as string;
const activityInfo = ref<ActDetail>();

// 游戏开始数据
const startGameData = ref<GameData>();

// 游戏状态 0-未开始 1-可参与 2-录音中 3-录音结束 4-抽奖结束
const gameStatus = ref<0 | 1 | 2 | 3 | 4>(0);
const gameNum = ref<number>(2); // 每局游戏的尝试次数

const ruleText = ref<string>();

const commonPopRef = shallowRef<InstanceType<typeof CommonPop>>();
const posterRef = shallowRef<InstanceType<typeof Poster>>();
const countDownPopRef = shallowRef<InstanceType<typeof RecordCountDownPop>>();
const otherPopRef = shallowRef<InstanceType<typeof OtherPop>>();

const currText = computed(() => {
  return textArr[textIndex.value];
});

wxConfig(["startRecord", "stopRecord", "translateVoice"], () => {
  wx.startRecord({
    success: () => {
      wx.stopRecord();
    },
    fail: () => {
      showToast("录音授权失败");
    }
  });
});

onBeforeMount(async () => {
  await getShareParams();
});

onMounted(() => {
  init();
});

const init = async () => {
  // 获取活动状态
  await getInfo();
  const statusMap = {
    0: "活动未开始",
    1: "活动已结束",
    2: "不能参与活动"
  };
  // 判断活动状态
  if (statusMap[actStatus.value]) {
    commonPopRef.value.init("custom", statusMap[actStatus.value]);
    return;
  }
  // 可以参与活动 进入下面步骤
  // 获取用户、活动信息
  await getDetail();
  getRandomIndex();
  // 判断是否第一次进入
  if (activityInfo.value.isGetFirstJoinChance) {
    commonPopRef.value?.init("first");
    return;
  }
};

const getInfo = async () => {
  const res = await getActInfo(aid);
  // 0-活动未开始 1-活动已结束 2-表明在控制时间段内，不能参与活动 3-活动进行中
  actStatus.value = res.status;
};

// 获取活动信息
const getDetail = async () => {
  const res = await getActAndUserDetail(aid);
  activityInfo.value = res;
};

const getActJson = async shareId => {
  const res: any = await getActInfoJson(aid);
  console.log(res, "res");
  ruleText.value = res.comment;
  setMiniProgramShare({
    title: "声趣新尚 悦享好礼",
    path: `${location.origin}/gslink/GsActNew/#/ASR?aid=${aid}&type=jigsaw&shareId=${shareId}`,
    imageUrl:
      "https://gszy-oss.baijqr.cn/image/activity/manual/asr-share-img.png"
  });
};

const getShareParams = async () => {
  const res = await getShareInfo(aid, sourceId);
  getActJson(res.shareId);
};

// 兑换次数
const exchangeCount = async () => {
  if (activityInfo.value.surplusPointsChance <= 0) {
    showCustomPop(1);
    return;
  }
  try {
    await pointExchangeChance(aid, sourceId);
    gameStatus.value = 1;
    // 兑换成功
    // 开始游戏
    await gameStart();
    // 更新活动信息
    await getDetail();
  } catch ({ code, msg }) {
    switch (code) {
      case 4004:
        // 飞天币不足
        showCustomPop(2);
        break;
      case 4007:
        // 挑战次数已用完
        showCustomPop(1);
        break;
      default:
        showToast(msg);
        break;
    }
  }
};

// 开始游戏
const gameStart = async () => {
  const res: any = await openGame(aid);
  // 这里存储结束游戏需要的数据
  startGameData.value = {
    gameId: res.gameId,
    pointConfig: res.maxScoreLimit,
    isFree: res.isFree
  };
  gameNum.value = 2;
};

// 结束游戏
const gameEnd = async () => {
  gameStatus.value = 4;
  try {
    const { gameId, pointConfig, isFree } = startGameData.value;
    const { latitude, longitude } = wxLoginData().get();
    const res: any = await endGame({
      activityId: aid,
      source: sourceId,
      gameId,
      point: pointConfig,
      lng: longitude,
      lat: latitude,
      chanceSource: isFree ? "free" : "points"
    });
    if (res.prizeType == 4000 || res.win == 0) {
      otherPopRef.value.init("thank");
    } else {
      // 中奖了
      otherPopRef.value.init("get", res.prizeValue);
    }
  } catch ({ code, msg }) {
    switch (code) {
      case 2005:
        // showCustomPop(2);
        otherPopRef.value.init("thank");
        // 没中奖
        break;
      default:
        showToast(msg);
        break;
    }
  }
};

// 显示兑换弹窗
const showExchangePop = () => {
  // 判断是否可以兑换
  if (gameStatus.value > 0) return;
  // 判断用户是否有足够的飞天币
  const { userPoint, neededPoints, surplusPointsChance, remainChanceTimes } =
    activityInfo.value;
  if (remainChanceTimes > 0) {
    commonPopRef.value?.init("join");
    return;
  }
  if (userPoint < neededPoints) {
    showCustomPop(2);
    return;
  }
  if (surplusPointsChance <= 0) {
    showCustomPop(1);
    return;
  }
  // 显示兑换弹窗
  commonPopRef.value?.init("exchange");
};

const closePoster = () => {
  gameStatus.value = 0;
  getDetail();
  posterRef.value.hidePoster();
};

// 录音
const startRecording = () => {
  timer = setTimeout(() => {
    if (gameStatus.value != 1) return;
    gameStatus.value = 2;
    gameNum.value = gameNum.value - 1;
    countDownPopRef.value.init("recording");
    wx.startRecord({
      fail: () => {
        showToast("录音授权失败");
      }
    });
    wx.onVoiceRecordEnd({
      // 录音时间超过一分钟没有停止的时候会执行 complete 回调
      complete: res => {
        const localId = res.localId;
        handleRecordEnd(localId);
      }
    });
  }, 300);
};

// 停止录音
const stopRecording = () => {
  setTimeout(() => {
    if (gameStatus.value != 2) {
      timer && clearTimeout(timer);
      return;
    }
    wx.stopRecord({
      success: res => {
        const localId = res.localId;
        handleRecordEnd(localId);
      },
      fail() {
        gameStatus.value = 3;
        countDownPopRef.value.hide();
        nextTick(() => {
          translateVoiceFail();
        });
      }
    });
  }, 100);
};

// 识别录音
const handleRecordEnd = localId => {
  gameStatus.value = 3;
  countDownPopRef.value.hide();
  wx.translateVoice({
    localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      const translateResult = res.translateResult; // 语音识别的结果
      // 判断文字是否匹配
      if (compareChinese(currText.value, translateResult)) {
        // 显示海报图
        // gameEnd();
        posterRef.value.showPoster(currText.value);
      } else {
        // 没有匹配 查看用户当局游戏次数 还有次数可以直接开始游戏 如果没有就需要重新兑换
        translateVoiceFail();
      }
    },
    fail() {
      translateVoiceFail();
    }
  });
};

const translateVoiceFail = () => {
  if (gameNum.value > 0) {
    countDownPopRef.value.init("again");
  } else {
    countDownPopRef.value.init("fail");
  }
};

const extractChinese = text => {
  return text.match(/[\u4e00-\u9fa5]/g)?.join("") || "";
};

const compareChinese = (str1, str2) => {
  // 这里把文字转拼音 有些识别出来可能是读音一样的另一个词语 所以这里把文字转成拼音再比较
  const chinese1 = pinyin(extractChinese(str1), { toneType: "none" });
  const chinese2 = pinyin(extractChinese(str2), { toneType: "none" });
  return chinese2.includes(chinese1);
};

const getRandomIndex = () => {
  const randomIndex = Math.floor(Math.random() * textArr.length); // 生成随机索引
  if (randomIndex === textIndex.value) {
    // 如果随机索引与当前索引相同，重新生成随机索引
    getRandomIndex();
  } else {
    textIndex.value = randomIndex;
  }
};

const handleRecordStatus = status => {
  countDownPopRef.value.hide();
  if (status === "recording") {
    // 倒计时结束
    stopRecording();
  } else if (status === "fail") {
    // 再次兑换
    gameStatus.value = 0;
    showExchangePop();
  } else if (status === "again") {
    // 重新开始游戏
    gameStatus.value = 1;
  }
};

const goMyPrizePage = () => {
  window.location.href = `/gansu/gansu-shop/trophy.html?type=1&xcxData=${getUrlParams("xcxData")}`;
};

const showRule = () => {
  otherPopRef.value.init("rule");
};

// 显示自定义弹窗 type 1 挑战次数已用完 2 飞天币不足
const showCustomPop = (type: 1 | 2) => {
  let content;
  if (type == 1) {
    content = `
    挑战次数已用完，感谢参与 <br >
    今日飞天币兑换还有 ${activityInfo.value.surplusPointsChance} 次机会
    `;
  } else if (type == 2) {
    content = `
    飞天币不足 <br >
    今日飞天币兑换还有 ${activityInfo.value.surplusPointsChance} 次机会
    `;
  }
  commonPopRef.value?.init("custom", content);
};

// 处理公共弹窗的按钮点击事件
const handleBtnClick = async (type, btnType) => {
  switch (type) {
    case "end":
      // 返回小程序
      gotoMiniProgram("back");
      break;
    case "first":
    case "join":
      // 活动开始
      gameStatus.value = 1;
      await gameStart();
      await getDetail();
      break;
    case "exchange":
      if (btnType === 1) {
        // 关闭弹窗
      } else {
        // 兑换游戏次数
        exchangeCount();
      }
      break;
  }
};

const handleOtherBtnClick = type => {
  if (type != "rule") {
    // 重置活动状态
    // gameStatus.value = 0;
    // getDetail();
    getRandomIndex();
  }
  if (type == "get") {
    showToast("领取成功");
  }
};
</script>

<style scoped></style>
