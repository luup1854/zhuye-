<script setup>
import { onMounted, ref } from "vue";
import { showToast } from "vant";

const detail = ref(null);

onMounted(() => {
  const data = localStorage.getItem("detail");
  if (data) {
    detail.value = JSON.parse(data);
  }
});

// 示例操作函数
const onShare = () => showToast("点击了分享");
const onCollect = () => showToast("已收藏");
const onEvaluate = () => showToast("查看评价");
const onApply = () => showToast("报名成功");
</script>

<template>
  <div v-if="detail">
    <!-- 活动信息卡片 -->
    <van-card
      :title="detail.name"
      :desc="detail.content"
      :tag="detail.place"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      class="mb-4"
    />

    <!-- 活动规则 -->
    <van-cell-group inset title="活动规则">
      <van-cell title="活动时间" :value="detail.time" />
      <van-cell title="人数限定" :value="detail.number" />
    </van-cell-group>

    <!-- 底部操作栏 -->
    <van-action-bar>
      <van-action-bar-icon icon="share-o" text="分享" @click="onShare" />
      <van-action-bar-icon icon="star-o" text="收藏" @click="onCollect" />
      <van-action-bar-button text="评价" @click="onEvaluate" />
      <van-action-bar-button color="#16a45e" text="我要报名" @click="onApply" />
    </van-action-bar>
  </div>
</template>

<style scoped></style>
