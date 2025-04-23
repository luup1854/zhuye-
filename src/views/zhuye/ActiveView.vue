<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(1);
const tabs = ["全部", "校园活动", "闲时兼职", "学生志愿"];
</script>

<template>
  <div class="h-full bg-white flex flex-col overflow-auto">
    <!-- 搜索框 -->
    <div class="p-4 bg-white">
      <van-search
        shape="round"
        placeholder="搜索"
        background="#ffffff"
        show-action
        @search="val => console.log('搜索内容：', val)"
      />
    </div>

    <!-- Tabs -->
    <div class="flex px-4 border-b">
      <div
        v-for="(item, index) in tabs"
        :key="item"
        @click="activeTab = index"
        class="px-2 py-2 text-sm relative cursor-pointer"
        :class="{
          'text-black font-medium': activeTab === index,
          'text-gray-500': activeTab !== index
        }"
      >
        {{ item }}
        <div
          v-if="activeTab === index"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-green-500 rounded-full"
        />
      </div>
    </div>

    <!-- 空状态 -->
    <div class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      暂无记录哦~
    </div>
  </div>
</template>
