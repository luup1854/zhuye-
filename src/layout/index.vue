<script setup lang="ts">
// import tabbar from "@/components/tabbar/index.vue";
// import NavBar from "@/components/nav-bar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
// import { useDarkMode } from "@/composables/useToggleDarkMode";
import { computed, onMounted, ref } from "vue";

import { decodeParamsByXcxData } from "@/utils/common";

const loading = ref<boolean>(true);
const tipError = ref<boolean>(false);

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
onMounted(async () => {
  // wx.miniProgram.getEnv(async res => {
  //   if (res.miniprogram) {
  await decodeParamsByXcxData();
  loading.value = false;
  // } else {
  //   tipError.value = true;
  // }
  // });
});
</script>

<template>
  <div class="app-wrapper">
    <!-- <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'"> -->
    <!-- <nav-bar /> -->
    <router-view v-slot="{ Component }">
      <keep-alive v-if="!loading" :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <div v-if="tipError" class="text-center mt-24 m-auto">请在小程序内打开</div>
    <!-- <tabbar /> -->
    <!-- </van-config-provider> -->
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
