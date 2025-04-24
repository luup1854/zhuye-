<script setup lang="ts">
import { getStuFeedback, putFeedbackService } from "@/api/zhuye";
import SubLayout from "@/views/zhuye/components/SubLayout.vue";
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/store/modules/member"; // 导入 store
const memberStore = useMemberStore();
const currentUser = memberStore.profile.username;
const showPopup = ref(false);
const router = useRouter();
const campusId = ref(router.currentRoute.value.params.id);
const input = ref("");
const goToPublish = () => {
  showPopup.value = true;
};

const onApply = async () => {
  try {
    await putFeedbackService(campusId.value, "2136101046", input.value);
    showPopup.value = false;
    input.value = "";
    showToast("发表成功");
    getFeedback();
  } catch (error) {
    console.log(error);
  }
};
const comments = ref([]);
//获取评论信息

const getFeedback = async () => {
  try {
    const res: any = await getStuFeedback(campusId.value);
    comments.value = res;
  } catch (error) {
    console.error(error);
  }
};

const onDelete = id => {};
onMounted(() => {
  getFeedback();
});
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
          <van-button
            v-if="item.username === currentUser"
            size="mini"
            type="danger"
            @click="onDelete(item.id)"
          >
            删除
          </van-button>
          <div>
            <div class="text-sm text-[#333] font-medium">
              {{ item.username }}
            </div>
            <div class="text-xs text-[#999]">{{ item.major }}</div>
          </div>
        </div>
        <van-rate :model-value="item.rate" readonly color="#16a45e" size="16" />
        <div class="text-sm text-[#555] mt-2 leading-relaxed">
          {{ item.content }}
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="showPopup"
      class="flex justify-center items-center flex-col p-[16px]"
    >
      <van-field
        v-model="input"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入反馈内容"
      />
      <van-button
        block
        class="mt-16 !bg-[#16a45e] !w-1/2 !h-[32px] !text-white"
        @click="onApply"
      >
        发表
      </van-button>
    </van-popup>
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

<style scoped></style>
