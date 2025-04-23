<template>
  <div
    v-show="show"
    class="absolute w-[300px] py-[20px] top-[276px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] rounded-[8px]"
  >
    <div
      v-if="statusType == 'recording'"
      class="count-down absolute top-[13px] right-[10px] w-[35px] h-[35px] rounded-full flex items-center justify-center text-[12px] text-[#8659F1] font-bold base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/count-down-bg.png)]"
    >
      {{ num }}s
    </div>
    <div
      class="title w-[53px] h-[21px] bg-[#8659F1] rounded-[11px] text-[14px] flex items-center justify-center text-white mx-auto"
    >
      标语
    </div>
    <div class="text text-[#E5DCFF] text-[14px] text-center mt-[10px]">
      {{ text }}
    </div>
    <template v-if="statusType == 'recording'">
      <div class="status text-center text-white text-[13px] mt-[10px]">
        语音录入中...
      </div>
      <div
        class="icon w-[38px] h-[51px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/voice-icon.png)] mt-[18px] mx-auto"
      />
      <div class="tip text-[12px] text-[#999999] mt-[18px] text-center">
        请用普通话读出祝福语哦！
      </div>
    </template>
    <template v-if="statusType == 'again'">
      <div class="status text-center text-white text-[13px] mt-[10px]">
        识别失败！
      </div>
      <div
        class="icon w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-try-again.png)] mt-[34px] mx-auto"
        @click="change"
      />
      <div class="tip text-[12px] text-[#999999] mt-[18px] text-center">
        您还可尝试1次
      </div>
    </template>
    <template v-if="statusType == 'fail'">
      <div class="status text-center text-white text-[13px] mt-[10px]">
        识别失败！
      </div>
      <div
        class="icon w-[145px] h-[37px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-try-again.png)] mt-[34px] mx-auto"
        @click="change"
      />
      <div class="tip text-[12px] text-[#999999] mt-[18px] text-center">
        消耗{{ actInfo.neededPoints }}飞天币兑换1次参与机会，今日 <br />
        兑换还有{{ actInfo.surplusPointsChance }}次机会
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

defineOptions({
  name: "recordCountDownPop"
});
const props = defineProps<{ text: string; actInfo: any }>();
const emit = defineEmits<{ change: [status: Status] }>();

const statusType = ref<Status>();

const num = ref(60);
const show = ref(false);

let timer: any;

// recording-录音  again-再次尝试 fail-失败
type Status = "recording" | "again" | "fail";

watch(show, () => {
  if (!show.value) {
    timer && clearInterval(timer);
  }
});

const init = (status: Status) => {
  statusType.value = status;
  timer = null;
  if (status === "recording") {
    // 录音开始
    num.value = 60;
    countDown();
  }
  show.value = true;
};

const hide = () => {
  show.value = false;
};
const countDown = () => {
  timer = setInterval(() => {
    num.value--;
    if (num.value === 0) {
      clearInterval(timer);
      change();
    }
  }, 1000);
};
const change = () => {
  emit("change", statusType.value);
};

defineExpose({ init, hide });
</script>

<style scoped></style>
