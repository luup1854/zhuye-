<script setup lang="ts">
import { ref } from "vue";
const showPopup = ref<boolean>(false);
const username = ref(""); // 用户名输入值

const userInfo = {
  nickname: "欢迎回来~~~",
  tips: "马上注册，使用更多功能"
};

const show = () => {
  showPopup.value = true;
};

const submitLogin = () => {
  console.log("用户登录账号：", username.value);
  showPopup.value = false;
};
</script>

<template>
  <div class="h-full pb-[10px]">
    <div
      class="flex justify-around items-center p-4 h-[180px] bg-[#16a45e]"
      @click="show"
    >
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

    <van-popup
      v-model:show="showPopup"
      :style="{ padding: '20px', width: '80%', borderRadius: '10px' }"
    >
      <div class="text-lg font-semibold mb-4">登录账号</div>
      <van-field
        v-model="username"
        label="账号"
        placeholder="请输入账号"
        clearable
      />
      <van-button type="primary" block class="mt-10" @click="submitLogin">
        登录
      </van-button>
    </van-popup>
  </div>
</template>
