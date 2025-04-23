<script setup lang="ts">
import { ref } from "vue";
import { getAidConfig } from "./config";
import RulePop from "./components/rulePop.vue";

const isShow = ref<boolean>(false);
const params = window.location.href.split("?")[1];

const goToActivity = (url: string) => {
  const baseUrl = window.location.origin;
  window.location.href = `${baseUrl}${url}`;
};
</script>

<template>
  <div
    class="relative min-h-full overflow-hidden base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/home-bg.jpg')]"
  >
    <div
      class="btn w-[78px] h-[27px] absolute top-[155px] right-0 base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/act-rule-bt.png')]"
      @click="isShow = true"
    />
    <RulePop v-model="isShow" />
    <div class="absolute top-[225px] left-[22px]">
      <div
        class="w-[168px] h-[363px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/poster-bg-1.png')]"
      />
      <div
        class="w-[93px] h-[32px] absolute top-[372px] left-[10px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/btn-1.png')]"
        @click="
          goToActivity(
            '/gansu/gansu-throwPot/home.html?aid=' +
              getAidConfig().throwPot +
              '&' +
              params
          )
        "
      />
    </div>
    <div class="absolute top-[174px] left-[107px]">
      <div
        class="w-[175px] h-[363px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/poster-bg-2.png')]"
      />
      <div
        class="w-[93px] h-[32px] absolute top-[376px] left-[30px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/btn-2.png')]"
        @click="
          goToActivity(
            '/gansu/gansu-pintu/home.html?aid=' +
              getAidConfig().pintu +
              '&share=1' +
              '&' +
              params
          )
        "
      />
    </div>
    <div class="absolute top-[222px] left-[246px]">
      <div
        class="w-[94px] h-[363px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/poster-bg-3.png')]"
      />
      <div
        class="btn w-[93px] h-[32px] absolute top-[376px] base-bg bg-[url('https://gszy-oss.baijqr.cn/image/activity/manual/hzz/btn-3.png')]"
        @click="
          goToActivity(
            '/gansu/gansu-ninebox/home.html?aid=' +
              getAidConfig().ninebox +
              '&' +
              params
          )
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
