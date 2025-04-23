<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = ref((route.meta.title as string) || "首页");

// 监听路由变化并更新标题
watch(
  () => route.path,
  () => {
    title.value = (route.meta.title as string) || "首页";
  }
);

// 是否显示导航头部
const showNavbar = computed(() => route.path !== "/Index");
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- 动态显示顶部导航 -->
    <van-nav-bar
      v-if="showNavbar"
      :title="title"
      class="sticky top-0 z-10 !text-white !bg-[#16a45e]"
    />

    <!-- 内容区域 -->
    <div class="flex-1 overflow-auto">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <!-- 底部导航始终显示 -->
    <van-tabbar
      route
      active-color="#4CAF50"
      class="sticky bottom-0 z-10 bg-white border-t"
    >
      <van-tabbar-item replace to="/Index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/Active" icon="volume-o"
        >报名</van-tabbar-item
      >
      <van-tabbar-item replace to="/Profile" icon="user-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<style scoped>
:deep(.van-nav-bar__title) {
  color: white !important;
}

</style>