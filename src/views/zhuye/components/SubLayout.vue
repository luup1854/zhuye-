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
      :title="route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>
