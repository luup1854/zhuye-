<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 返回上一页
const onClickLeft = () => {
  router.back();
};
</script>

<template>
  <div>
    <van-nav-bar
      :title="route.meta.title as string"
      left-text="返回"
      class="sticky top-0 z-10 !text-white !bg-[#16a45e]"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>
<style scoped>
:deep(.van-nav-bar__title) {
  color: white !important;
}
:deep(.van-nav-bar__text) {
  color: white !important;
}
:deep(.van-nav-bar__arrow){
    color: white !important;
}
</style>
