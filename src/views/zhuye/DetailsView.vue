<script setup lang="ts">
import { onMounted, ref } from "vue";
import { showToast } from "vant";
import SubLayout from "@/views/zhuye/components/SubLayout.vue";
import { applicationService } from "@/api/zhuye/index";
import { useRouter } from "vue-router";

const router = useRouter();
const detail = ref(null);
const showPopup = ref(false);
const btnDisabled = ref(false);
const input = ref("");
onMounted(() => {
  const data = localStorage.getItem("detail");
  detail.value = data ? JSON.parse(data) : {};
});

const onShare = () => showToast("点击了分享");
const onCollect = () => showToast("已收藏");
const onEvaluate = () => {
  router.push("/Comment/" + detail.value.id); 
};
const show = () => {
  showPopup.value = true;
};
const onApply = async () => {
  const params = {
    username: input.value,
    institutionId: detail.value.institutionId,
    campusId: detail.value.id
  };
  try {
    await applicationService(params);
    btnDisabled.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    showPopup.value = false;
  }
};
</script>
<template>
  <div class="bg-[#fff] min-h-screen pb-16">
    <sub-layout />
    <!-- 顶部图片展示 -->
    <div class="w-full h-52 bg-gray-100 overflow-hidden">
      <img alt="活动主图" class="w-full h-full object-cover" />
    </div>
    <van-card class="rounded-2xl !bg-white">
      <template #title>
        <div class="text-xl font-bold text-[#333]">
          {{ detail?.name || "活动名称" }}
        </div>
      </template>

      <template #desc>
        <div class="text-[#666] text-sm leading-relaxed mt-1">
          {{ detail?.content || "暂无活动介绍" }}
        </div>
      </template>

      <template #bottom>
        <div class="text-sm text-[#888] mt-4 space-y-2">
          <div>
            <span class="text-[#444]">时间：</span>{{ detail?.time || "--" }}
          </div>
          <div>
            <span class="text-[#444]">地址：</span>{{ detail?.place || "--" }}
          </div>
          <div>
            <span class="text-[#444]">需求人数：</span
            >{{ detail?.number || "--" }} 人
          </div>
          <div>
            <span class="text-[#444]">物资需求：</span
            >{{ detail?.goods || "--" }}
          </div>
        </div>
      </template>
    </van-card>

    <!-- 底部操作栏 -->
    <van-action-bar>
      <van-action-bar-icon icon="share-o" text="分享" @click="onShare" />
      <van-action-bar-icon icon="star-o" text="收藏" @click="onCollect" />
      <van-action-bar-button
        text="评价"
        @click="onEvaluate"
        class="border border-[#16a45e] text-[#16a45e] bg-white"
        style="border-radius: 999px; margin-right: 8px"
      />
      <van-action-bar-button
        :disabled="btnDisabled"
        color="#16a45e"
        @click="show"
        style="border-radius: 999px"
      >
        {{ btnDisabled ? "已报名" : "我要报名" }}
      </van-action-bar-button>
    </van-action-bar>

    <van-popup
      v-model:show="showPopup"
      class="flex justify-center items-center flex-col p-[16px]"
    >
      <van-field v-model="input" label="账号" placeholder="请输入账号" />
      <van-button
        block
        class="mt-16 bg-[#16a45e] !w-1/2 !h-[32px]"
        @click="onApply"
      >
        报名
      </van-button>
    </van-popup>
  </div>
</template>

<style scoped>
.van-button--default {
  border: #16a45e 1px solid;
  color: #16a45e;
}
</style>
