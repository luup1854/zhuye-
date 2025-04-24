<script setup lang="ts">
import { loginStu } from "@/api/zhuye";
import { computed, ref } from "vue";
import { useMemberStore } from "@/store/modules/member";

const showPopup = ref<boolean>(false);
const username = ref(""); // 用户名输入值

const memberStore = useMemberStore(); // 获取 store 实例

// 弹出登录弹窗
const show = () => {
  if(memberStore.profile.major && memberStore.profile.name) return
  showPopup.value = true;
};

// 退出登录
const logout = () => {
  memberStore.clearProfile();
};

// 判断是否登录
const isLoggedIn = computed(() => {
  return !!(memberStore.profile.name && memberStore.profile.major);
});

// 点击头部区域
const handleClick = () => {
  if (!isLoggedIn.value) {
    show();
  }
};

// 登录提交
const submitLogin = async () => {
  console.log("用户登录账号：", username.value);
  const res: any = await loginStu(username.value);
  if (res) {
    console.log("用户登录账号：", res);
    memberStore.setProfile({
      username: res.username,
      name: res.name,
      university: res.university,
      college: res.college,
      major: res.major,
      phone: res.phone,
      idCard: res.idCard
    });
    showPopup.value = false;
  } else {
    console.error("登录失败或请求异常");
    // 你也可以加个 Toast 提示
  }
};

const userInfo = {
  pleaseLogin: "请登录"
};
</script>

<template>
  <div class="h-full pb-[10px]">
    <!-- 头部区域 -->
    <div
      class="flex justify-around items-center p-4 h-[180px] bg-[#16a45e]"
      :class="{ 'cursor-pointer': !isLoggedIn }"
      @click="handleClick"
    >
      <div>
        <div class="text-lg font-semibold text-white">
          {{
            isLoggedIn
              ? `${memberStore.profile.major} - ${memberStore.profile.name}`
              : userInfo.pleaseLogin
          }}
        </div>
        <div
          v-if="isLoggedIn"
          class="mt-2 text-sm text-white underline cursor-pointer"
          @click.stop="logout"
        >
          退出登录
        </div>
      </div>
      <div>
        <van-icon name="user-circle-o" size="60" color="#fff" />
      </div>
    </div>

    <!-- 功能区域 -->
    <div class="mt-[35px]">
      <van-cell-group inset>
        <van-cell
          title="我的活动报名"
          is-link
          icon="edit"
          @click="$router.push('/User/Active')"
        />
        <van-cell title="关于我们" is-link icon="info-o" />
        <van-cell title="设置" is-link icon="setting-o" />
      </van-cell-group>
    </div>

    <!-- 登录弹窗 -->
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
