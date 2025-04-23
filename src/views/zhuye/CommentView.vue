<script setup lang="ts">
import SubLayout from "@/views/zhuye/components/SubLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goToPublish = () => {
  router.push("/publish"); // 根据你的路由调整
};

const comments = ref([
  {
    user: "用户A",
    avatar: "https://via.placeholder.com/40",
    time: "2025-04-21",
    rate: 5,
    content: "非常满意，服务很好，活动也很有趣！"
  },
  {
    user: "用户B",
    avatar: "https://via.placeholder.com/40",
    time: "2025-04-20",
    rate: 4,
    content: "整体不错，组织得还可以，就是人有点多。"
  },
  {
    user: "用户B",
    avatar: "https://via.placeholder.com/40",
    time: "2025-04-20",
    rate: 4,
    content: "整体不错，组织得还可以，就是人有点多。"
  },
  {
    user: "用户B",
    avatar: "https://via.placeholder.com/40",
    time: "2025-04-20",
    rate: 4,
    content: "整体不错，组织得还可以，就是人有点多。"
  },
  {
    user: "用户B",
    avatar: "https://via.placeholder.com/40",
    time: "2025-04-20",
    rate: 4,
    content: "整体不错，组织得还可以，就是人有点多。"
  },
  {
    user: "用户B",
    avatar: "https://via.placeholder.com/40",
    time: "2025-04-20",
    rate: 4,
    content: "整体不错，组织得还可以，就是人有点多。"
  }
]);
</script>

<template>
  <div class="h-screen flex flex-col bg-[#f5f5f5] relative">
    <!-- 顶部导航栏固定 -->
    <div class="fixed top-0 left-0 w-full z-40">
      <sub-layout />
    </div>

    <!-- 滚动区域，顶部留出导航栏空间 -->
    <div class="flex-1 overflow-auto pt-[60px] px-4 pb-10">
      <!-- 空状态 -->
      <div
        v-if="comments.length === 0"
        class="flex flex-col items-center justify-center text-gray-400 text-sm mt-10"
      >
        <img
          src="https://img.yzcdn.cn/vant/empty-image-default.png"
          class="w-24 h-24 mb-2"
        />
        暂无评论记录~
      </div>

      <!-- 用户评论列表 -->
      <div
        v-for="(item, index) in comments"
        :key="index"
        class="bg-white rounded-xl p-4 shadow mb-3"
      >
        <div class="flex items-center mb-2">
          <img :src="item.avatar" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <div class="text-sm text-[#333] font-medium">{{ item.user }}</div>
            <div class="text-xs text-[#999]">{{ item.time }}</div>
          </div>
        </div>
        <van-rate :model-value="item.rate" readonly color="#16a45e" size="16" />
        <div class="text-sm text-[#555] mt-2 leading-relaxed">
          {{ item.content }}
        </div>
      </div>
    </div>

    <!-- 悬浮按钮 -->
    <van-button
      icon="edit"
      type="primary"
      class="fixed left-4 bottom-6 z-50 shadow-lg !w-14 !h-14 !p-0 flex items-center justify-center"
      color="#16a45e"
      round
      @click="goToPublish"
    />
  </div>
</template>

<style scoped>
/* 根据 sub-layout 的实际高度来调整 pt-[60px] */
</style>
