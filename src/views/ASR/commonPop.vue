<template>
  <van-overlay :show="show" :custom-style="{ background: 'transparent' }">
    <div
      v-if="type == 'end'"
      class="absolute w-[300px] h-[207px] top-[276px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] rounded-[8px] pt-[77px]"
    >
      <div class="text-[14px] text-[#E5DCFF] text-center">
        本活动已结束，感谢您的关注
      </div>
      <div
        class="btn mt-[54px] mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-know2.png)]"
        @click="btnClick()"
      />
    </div>
    <div
      v-if="type == 'custom'"
      class="absolute w-[300px] h-[185px] top-[276px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] rounded-[8px] pt-[54px] px-[24px]"
    >
      <div class="text-[14px] text-[#E5DCFF] text-center" v-html="content" />
      <div
        class="btn mt-[30px] mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-know2.png)]"
        @click="btnClick()"
      />
    </div>
    <div
      v-else-if="type == 'first'"
      class="absolute w-[300px] h-[185px] top-[276px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] rounded-[8px] pt-[54px] px-[24px]"
    >
      <div class="text-[14px] text-[#E5DCFF] text-center">
        欢迎首次进入“新尚语音识别”活动，获得1次参与活动机会
      </div>
      <div
        class="btn mt-[30px] mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-join.png)]"
        @click="btnClick()"
      />
    </div>
    <div
      v-else-if="type == 'join'"
      class="absolute w-[300px] h-[185px] top-[276px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] rounded-[8px] pt-[54px] px-[24px]"
    >
      <div class="text-[14px] text-[#E5DCFF] text-center">
        消耗1次活动机会，参与活动
      </div>
      <div
        class="btn mt-[30px] mx-auto w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-join.png)]"
        @click="btnClick()"
      />
    </div>
    <div
      v-else-if="type == 'exchange'"
      class="absolute w-[300px] h-[207px] top-[276px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] rounded-[8px] pt-[21px]"
    >
      <div class="title text-[#E5DCFF] text-[14px] text-center">
        确认要消耗飞天币参与游戏吗？
      </div>
      <div
        class="score mt-[14px] text-center text-[13px] text-white leading-[25px]"
      >
        我的飞天币：{{ actInfo.userPoint }} <br />
        消耗飞天币：{{ actInfo.neededPoints }} <br />
        今日兑换还有{{ actInfo.surplusPointsChance }}次机会
      </div>
      <div class="btn mt-[20px] mx-[25px] flex items-center justify-around">
        <div
          class="btn w-[118px] h-[33px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-back.png)]"
          @click="btnClick(1)"
        />
        <div
          class="btn w-[118px] h-[33px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-exchange.png)]"
          @click="btnClick(2)"
        />
      </div>
    </div>
  </van-overlay>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "CommonPop"
});

const props = defineProps<{ actInfo: any }>();
const emit = defineEmits<{ btnClick: [type: string, btnType?: number] }>();

// end-活动结束 first-第一次进入 exchange-兑换抽奖机会  custom-自定义
type Type = "end" | "first" | "exchange" | "custom" | "join";

const show = ref<boolean>(false);
const type = ref<Type>();
const content = ref<string>();

const init = (val: Type, html?: string) => {
  type.value = val;
  if (val === "custom") {
    content.value = html;
  }
  show.value = true;
};

const btnClick = (btnType?: number) => {
  show.value = false;
  emit("btnClick", type.value, btnType);
};

defineExpose({ init });
</script>

<style scoped></style>
