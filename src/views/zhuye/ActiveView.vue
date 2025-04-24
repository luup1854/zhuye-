<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCampusByName, getCampusService } from "@/api/zhuye/index";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/store/modules/member"; // 导入 store
import { showToast } from "vant";
const memberStore = useMemberStore();

const router = useRouter();
const activities = ref([]); // 用于存储活动数据
const loading = ref(true); // 用于控制加载状态
const searchValue = ref(""); // 搜索框的值

// 获取校园活动数据
const getCampus = async () => {
  loading.value = true;
  try {
    const res: any = await getCampusService();
    activities.value = res;
  } catch (error) {
    console.error("请求失败：", error);
  } finally {
    loading.value = false;
  }
};

// 搜索活动
const onSearch = async () => {
  if (searchValue.value.trim() === "") {
    // 如果搜索框为空，则显示全部数据
    await getCampus();
  } else {
    // 如果搜索框有内容，则执行搜索
    try {
      const res: any = await getCampusByName(searchValue.value);
      activities.value = res;
    } catch (error) {
      console.error("搜索失败：", error);
      showToast("未找到相关活动");
      activities.value = []; // 如果搜索失败，清空活动列表
    }
  }
};

// 跳转到详情页
const goDetails = detail => {
  if (memberStore.profile.username === "") {
    showToast("请先登录");
    router.push("/Profile");
  } else {
    localStorage.setItem("detail", JSON.stringify(detail));
    router.push("/Detail");
  }
};

onMounted(() => {
  getCampus(); // 初始化时获取全部活动数据
});
</script>

<template>
  <div class="h-full bg-white flex flex-col overflow-auto">
    <div class="p-4 bg-white">
      <van-search
        shape="round"
        v-model="searchValue"
        placeholder="搜索校园活动"
        background="#ffffff"
        show-action
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
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
