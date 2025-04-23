<script setup lang="ts">
const userInfo = {
  nickname: "欢迎回来~~~",
  tips: "马上注册，使用更多功能"
};
</script>

<template>
  <div class="h-full  pb-[10px]">
    <div class="flex justify-around items-center p-4 h-[180px] bg-[#16a45e]">
      <div>
        <div class="text-lg font-semibold text-white">
          {{ userInfo.nickname }}
        </div>
        <div class="text-sm mt-1 text-white">{{ userInfo.tips }}</div>
      </div>
      <div>
        <van-icon name="user-circle-o" size="60" color="#fff" />
      </div>
    </div>
    <div class="mt-[35px]">
      <van-cell-group inset>
        <van-cell title="我的活动报名" is-link icon="edit" />
        <van-cell title="关于我们" is-link icon="info-o" />
        <van-cell title="设置" is-link icon="setting-o" />
      </van-cell-group>
    </div>
  </div>
</template>
