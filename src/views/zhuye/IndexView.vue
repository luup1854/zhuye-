<script setup lang="ts">
import { ref } from "vue";

const tab = ref(0);
const icons = [
  { icon: "location-o", text: "校园活动" },
  { icon: "friends-o", text: "闲时兼职" },
  { icon: "records", text: "学生志愿" }
];
</script>

<template>
  <div class="h-full bg-white overflow-auto">
    <!-- 顶部图片横幅 -->
    <div
      class="relative w-full h-[220px] bg-gray-100 flex items-center justify-center"
    >
      <span class="text-gray-400">横幅区域</span>
    </div>

    <!-- 功能入口 -->
    <div class="mt-4 px-4">
      <div class="flex justify-around text-center">
        <div
          v-for="item in icons"
          :key="item.text"
          class="flex flex-col items-center"
        >
          <van-icon :name="item.icon" class="text-green-500" size="28" />
          <span class="mt-2 text-sm text-gray-700">{{ item.text }}</span>
        </div>
      </div>
    </div>

    <!-- 推荐模块 -->
    <div class="px-4 mt-6">
      <h3 class="text-lg font-semibold mb-2">推荐</h3>
      <van-tabs v-model:active="tab">
        <van-tab title="热门">
          <div class="text-center py-5 text-gray-500">加载中...</div>
        </van-tab>
        <van-tab title="最新">
          <div class="text-center py-5 text-gray-500">加载中...</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped>
/* 如有额外样式可在这里扩展 */
</style>
