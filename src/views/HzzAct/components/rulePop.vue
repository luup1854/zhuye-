<script setup lang="ts">
defineOptions({
  name: "rulePop"
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <van-overlay
    :show="modelValue"
    :custom-style="{ background: 'rgba(0, 0, 0, 0.5)' }"
    :lock-scroll="false"
  >
    <div
      class="w-[292px] h-[479px] absolute top-[158px] left-[42px] px-[20px] py-[80px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/act-rule-bg.png')]"
    >
      <div class="h-full overflow-y-auto">
        一、 活动时间:2025年03月17日17:00-2025年04月09日17:00。<br />
        二、 活动奖品是随机飞天币，奖品有限，先到先得。<br />
        三、 活动内容：<br />
        1.
        本次酷黑乐园集合活动包含三个活动：悠享兰州（投壶活动）、嘿嘿有礼（拼图活动）、能量心语（幸运9宫格活动）.<br />
        2.
        所有活动，均需消耗相应飞天币，获得参与机会；每人每天均有限制参与机会次数，详情进入相应活动页面了解。
        四、活动须知：<br />
        1、活动主办方可以依据本次活动的实际开展情况对活动规则进行调整，相关调整将公布在活动页面上，并于公布时即时生效。活动过程中，若出现不可抗力或情势变更的情况(包括但不限于重大灾害案件、活动受政府机关指令需要停办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办等)，活动主办方有权终止活动。<br />
        2、若发现用户在活动中使用任何不正当的手段(如软件作弊、利用黑客工具等)参加活动，活动主办方有权在不事先通知的情况下，取消其参加活动的资格，并撤销其获奖奖品，具体认定以活动主办方判定为准。<br />
      </div>
    </div>
    <div
      class="btn w-[38px] h-[39px] absolute top-[603px] left-[168px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/close.png')]"
      @click="closePopup"
    />
  </van-overlay>
</template>
