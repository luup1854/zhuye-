<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getStuCampus } from "@/api/zhuye/index";
import { useRouter } from "vue-router";
import SubLayout from "@/views/zhuye/components/SubLayout.vue";
import { useMemberStore } from "@/store/modules/member"; // 导入 store
const memberStore = useMemberStore();
const currentUser = memberStore.profile.username;
const router = useRouter();
const activities = ref([]);
const loading = ref(true);

// 获取学生校园活动数据
const getCampus = async () => {
  loading.value = true;
  try {
    const res: any = await getStuCampus(currentUser);
    activities.value = res;
  } catch (error) {
    console.error("请求失败：", error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getCampus();
});
</script>

<template>
  <div class="h-full bg-white flex flex-col overflow-auto">
    <sub-layout />
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
          <template #desc>
            <div class="line-clamp-3 text-gray-700 text-sm">
              {{ activity.content }}
            </div>
          </template>
          <template #bottom>
            <div class="text-sm text-[#888] mt-4 space-y-2">
          <div>
            <span class="text-[#444]">机构反馈：</span>{{ activity?.feedbackInstitution || "--" }}
          </div>
          <div>
            <span class="text-[#444]">学生反馈：</span>{{ activity?.feedbackStu || "--" }}
          </div>
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
