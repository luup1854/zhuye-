<script setup lang="ts">
import { loginStu } from "@/api/zhuye";
import { ref } from "vue";
import { useMemberStore } from "@/store/modules/member"; // 导入 store

const showPopup = ref<boolean>(false);
const username = ref(""); // 用户名输入值

const userInfo = {
  nickname: "欢迎回来~~~",
  tips: "使用更多功能",
  pleaseLogin: "请登录"
};

// 获取 store 实例
const memberStore = useMemberStore();
const show = () => {
  if(memberStore.profile.major && memberStore.profile.name) return
  showPopup.value = true;
};

const submitLogin = () => {
  loginStu(username.value)
    .then((res: any) => {
      console.log("用户登录账号：", res);
      if (res) {
        // 将获取到的学生信息存储到 Pinia store 中
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
        // 登录失败，提示错误信息
        console.error("登录失败", res);
        // 可以在这里添加一个提示框或者弹窗，告知用户登录失败
      }
    })
    .catch(error => {
      console.error("登录请求出错", error);
      // 登录失败时的错误提示
      // 可以在这里显示错误提示给用户
    });
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
          <!-- 如果 Pinia 中有学生信息，显示 major 和 name，否则显示 请登录 -->
          {{
            memberStore.profile.major && memberStore.profile.name
              ? `${memberStore.profile.major} - ${memberStore.profile.name}`
              : userInfo.pleaseLogin
          }}
        </div>
      </div>
      <div>
        <van-icon name="user-circle-o" size="60" color="#fff" />
      </div>
    </div>

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
