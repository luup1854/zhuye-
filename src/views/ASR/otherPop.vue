<template>
  <van-overlay :show="show" :lock-scroll="false">
    <div
      v-if="type == 'rule'"
      class="absolute w-[320px] h-[326px] top-[193px] left-1/2 -translate-x-1/2 base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/pop-bg.png)] rounded-[8px]"
    >
      <div class="text-[#4B3496] text-[22px] mt-[24px] text-center font-bold">
        活动规则
      </div>
      <div
        style="overflow-y: auto"
        class="m-[20px] h-[220px] text-[13px] text-[#4B3496] font-medium"
        v-html="ruleText"
      />
      <!-- 1.参与者需为LZ飞天的注册用户，并确保账号处于正常状态。<br />
    2.每个用户账号每天限参与活动3次，您在首次参与活动时不扣减积分，后期每次参与需扣除25飞天币。<br />
    3.您进入活动页面后点击“参与活动”，成功支付相应飞天币后，点击“语音输入”按钮，长按语音输入按钮的同时，念出页面展示的品牌标语；<br />
    4.如无法正确读出导致识别失败或超出游戏限定的参与时间未成功完成游戏，则游戏结束；<br />
    5.参与活动支付的飞天币，一旦扣减将不予退回，请您知悉；<br />
    6.成功识别语音后，您将看到一张带有语音识别活动二维码和此次参与活动的标语文案的宣传海报，您可以收藏、分享好友、保存相册；<br />
    7.您可点击抽奖按钮进行抽奖，即有一定几率中取飞天币奖励；<br />
    8.飞天币奖励非100%中奖，请以实际显示为准，敬请您知悉并理解；中取奖励后将直接充值至您的账号，您可在积分商城内使用。<br />
    9.如发现参与者存在作弊违规行为，平台有权取消其参与资格，收回已发放的奖品，并对违规账号进行相应处理。<br />
    10.根据依照国家法律法规的相关规定，未满十八岁请勿参与，LZ飞天小程序保留对活动规则进行解释和修改的权利，在法律法规范围内本活动不作为强制性活动，我方有权对本活动进行暂停、下架、重启等事宜，您有权根据自身情况决定是否参与；活动开展过程中我方有权对活动进行调整，包括但不限于提升奖励、降低奖励、停止奖励和下架活动，具体请以实际显示为准。 -->
      <div
        class="btn mt-[54px] mx-auto w-[40px] h-[40px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/close.png)]"
        @click="btnClick()"
      />
    </div>
    <div
      v-if="type == 'get'"
      class="absolute w-[320px] h-[326px] top-[193px] left-1/2 -translate-x-1/2 base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/rule-pop.png)] rounded-[8px]"
    >
      <!-- <div><span>声趣新尚</span><span>悦享好礼</span></div> -->
      <div
        class="absolute w-[66px] h-[66px] top-[112px] left-1/2 -translate-x-1/2"
      >
        <img
          class="w-full h-full"
          src="https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/fly.png"
        />
      </div>
      <div
        class="absolute text-[13px] text-[#4B3496] left-1/2 -translate-x-1/2 text-center top-[204px]"
      >
        恭喜获得{{ point }}飞天币！
      </div>
      <div
        class="absolute top-[244px] btn left-1/2 -translate-x-1/2 mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-get.png)]"
        @click="btnClick()"
      />
    </div>
    <div
      v-if="type == 'thank'"
      class="absolute w-[320px] h-[231px] top-[193px] left-1/2 -translate-x-1/2 base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/no-prize-pop-bg.png)] rounded-[8px]"
    >
      <!-- <div><span>声趣新尚</span><span>悦享好礼</span></div> -->
      <div
        class="absolute w-[66px] h-[66px] top-[30px] left-1/2 -translate-x-1/2"
      >
        <img
          class="w-full h-full"
          src="https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/thank.png"
        />
      </div>
      <div
        class="absolute text-[13px] text-[#4B3496] left-1/2 -translate-x-1/2 text-center top-[120px]"
      >
        谢谢参与！
      </div>
      <div
        class="absolute top-[160px] btn left-1/2 -translate-x-1/2 mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-know.png)]"
        @click="btnClick()"
      />
    </div>
    <!-- <div
      v-if="type == 'thank'"
      class="absolute w-[320px] h-[231px] top-[193px] left-1/2 -translate-x-1/2 base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/no-prize-pop-bg.png)] rounded-[8px]"
    >
      <div class="text-[13px] text-[#4B3496] text-center mt-[77px]">
        谢谢参与！
      </div>
      <div
        class="btn mt-[60px] mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-know.png)]"
        @click="btnClick()"
      />
    </div> -->
  </van-overlay>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "OtherPop"
});

defineProps<{ ruleText: any }>();
const emit = defineEmits<{ btnClick: [type: string, btnType?: number] }>();

// rule-活动规则 get-中奖 thank-未中奖
type Type = "rule" | "get" | "thank";

const show = ref<boolean>(false);
const type = ref<Type>();
const point = ref<number>();
const init = (val: Type, pointnum?: number) => {
  type.value = val;
  if (val == "get") {
    point.value = pointnum;
  }
  show.value = true;
};

const btnClick = () => {
  show.value = false;
  emit("btnClick", type.value);
};

defineExpose({ init });
</script>

<style scoped></style>
