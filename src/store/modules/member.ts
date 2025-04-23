// src/stores/member.ts
import type { StudentProfile } from "@/typings/member";
import { defineStore } from "pinia";
import { ref } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 引入持久化插件

// 定义 Store
export const useMemberStore = defineStore(
  "member",
  () => {
    const profile = ref<StudentProfile>({
      username: "",
      name: "",
      university: "",
      college: "",
      major: "",
      phone: "",
      idCard: ""
    });

    const setProfile = (val: StudentProfile) => {
      profile.value = { ...val };
    };

    const clearProfile = () => {
      profile.value = {
        username: "",
        name: "",
        university: "",
        college: "",
        major: "",
        phone: "",
        idCard: ""
      };
    };

    return {
      profile,
      setProfile,
      clearProfile
    };
  },
  {
    persist: {
      storage: localStorage // 使用 localStorage 进行持久化存储
    }
  }
);
