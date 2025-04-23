<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCampusService } from "@/api/zhuye/index.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const activities = ref([]);
const loading = ref(true);

// 获取校园活动数据
const getCampus = async () => {
  loading.value = true;
  try {
    const res = await getCampusService();
    activities.value = res;
  } catch (error) {
    console.error("请求失败：", error);
  } finally {
    loading.value = false;
  }
};
const goDetails = datail => {
  localStorage.setItem("detail", JSON.stringify(datail));
  router.push("/Detail");
};

onMounted(() => {
  getCampus();
});
</script>

<template>
  <div class="h-full bg-white flex flex-col overflow-auto">
    <div class="p-4 bg-white">
      <van-search
        shape="round"
        placeholder="搜索校园活动"
        background="#ffffff"
        show-action
        @search="val => console.log('搜索内容：', val)"
      />
    </div>
    <div class="flex justify-start px-4 border-b">
      <div class="text-green-600 text-lg font-semibold relative pb-2">
        校园活动
        <div class="w-5 h-1 bg-green-500 rounded-full mx-auto mt-1"></div>
      </div>
    </div>

    <!-- 活动列表或加载/空状态 -->
    <div class="flex-1 overflow-auto p-4">
      <!-- 加载中 -->
      <van-loading
        v-if="loading"
        type="spinner"
        size="24px"
        class="mx-auto mt-10"
      />

      <!-- 活动列表 -->
      <van-cell-group v-else-if="activities.length > 0">
        <van-card
          v-for="(activity, index) in activities"
          :key="index"
          class="mb-4"
        >
          <template #title>
            <div class="flex justify-between items-center mb-[10px] mt-[10px]">
              <div class="text-lg font-semibold text-gray-800">
                {{ activity.name }}
              </div>
              <van-button
                type="primary"
                size="small"
                class="mb-2 w-[100px]"
                color="#16a45e"
                @click="goDetails(activity)"
              >
                详情
              </van-button>
            </div>
          </template>
          <template #desc>
            <div class="line-clamp-3 text-gray-700 text-sm">
              {{ activity.content }}
            </div>
          </template>

          <template #bottom>
            <div class="text-xs text-gray-500 mt-2 space-y-1">
              <div>时间：{{ activity.time }}</div>
              <div>地址：{{ activity.place }}</div>
              <div>需求人数：{{ activity.number }} 人</div>
              <div>物资需求：{{ activity.goods }}</div>
            </div>
          </template>
        </van-card>
      </van-cell-group>

      <!-- 空状态 -->
      <div
        v-else
        class="flex flex-col items-center justify-center text-gray-400 text-sm mt-10"
      >
        <img
          src="https://img.yzcdn.cn/vant/empty-image-default.png"
          class="w-24 h-24 mb-2"
        />
        暂无活动记录~
      </div>
    </div>
  </div>
</template>
