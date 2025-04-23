<template>
  <van-overlay :show="show" :lock-scroll="false">
    <div class="wrapper px-[40px] pt-[48px] pb-[63px] h-full overflow-y-auto">
      <div class="poster w-[236px] h-[512px] rounded-[15px] mx-auto">
        <img
          v-if="posterUrl"
          :src="posterUrl"
          class="w-full h-full rounded-[15px]"
        />
      </div>
      <div class="btn mt-[17px] flex justify-around">
        <div
          v-if="gameStatus == 3"
          class="w-[118px] h-[33px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-prize-draw.png)]"
          @click="emit('onDraw')"
        />
        <div
          v-if="gameStatus == 4"
          class="w-[118px] h-[33px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-back.png)]"
          @click="emit('back')"
        />
        <div
          class="w-[156px] h-[33px] base-bg bg-[url(https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/btn-save-tip.png)]"
        />
      </div>
    </div>
  </van-overlay>
</template>
<script setup lang="ts">
import { ref } from "vue";
import generateQrcode from "@/utils/qrcode";
import generatePoster from "./utils/generatePoster";
import { wxLoginData } from "@/utils/common";
defineOptions({
  name: "Poster"
});

const qrcodeUrlMap = {
  prod: {
    host: "http://gszy.baijqr.cn/code/",
    params: "?https://gszy.baijqr.cn/gslink/GsActNew/#/ASR?aid="
  },
  test: {
    host: "https://gs-test.baijqr.cn/code/",
    params: "?https://gs-test.baijqr.cn/gslink/GsActNew/#/ASR?aid="
  }
};

const currEnv = import.meta.env.VITE_MINI_ENV;

const props = defineProps<{ aid: string | string[]; gameStatus: number }>();

const emit = defineEmits<{ onDraw: []; back: [] }>();

const show = ref(false);
const posterUrl = ref("");
const qrcodeUrl = ref("");

const bg = "https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/poster-bg.jpg";
const avatar = "https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/avatar.png";
const dialog = "https://gszy-oss.baijqr.cn/gansu_oss/gansu/asr/dialog.png";

const defaultAvatar =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

// https://gs-test.baijqr.cn/code/?https://gs-test.baijqr.cn/gansu/GsActNew/#/ASR?aid=461
// http://gszy.baijqr.cn/code/?https://gszy.baijqr.cn/gansu/GsActNew/#/ASR?aid=xxx

const showPoster = async (text: string) => {
  console.log(currEnv, "currEnv");
  show.value = true;
  // 获取用户信息
  const { nickname, headImgUrl } = wxLoginData().get();
  await getQrcode();
  getPoster({
    text,
    title: `来自${nickname}的分享活动`,
    avatarUrl: headImgUrl == defaultAvatar ? avatar : headImgUrl
  });
};

const hidePoster = () => {
  show.value = false;
};

const getQrcode = async () => {
  const url = await generateQrcode({
    text: `${qrcodeUrlMap[currEnv].host}${encodeURIComponent(`${qrcodeUrlMap[currEnv].params}${props.aid}&share=1`)}`
  });
  qrcodeUrl.value = url;
  // console.log(url, "url");
  // console.log(
  //   `${qrcodeUrlMap[currEnv].host}${encodeURIComponent(`${qrcodeUrlMap[currEnv].params}${props.aid}&share=1`)}`
  // );
};

const getPoster = async ({ text, title, avatarUrl }) => {
  const url = await generatePoster({
    canvasWidth: 700,
    canvasHeight: 1600,
    outputFormat: "image/jpeg", // webp 格式最小 但是部分 ios 可能不支持 这里用 jpeg 减小图片大小
    jpegQuality: 1,
    // 图片部分 背景固定 头像取用户头像（没有取默认） 用户对话框 二维码
    images: [bg, avatarUrl, dialog, qrcodeUrl.value],
    texts: [
      title, // 这里取用户昵称 没有取微信用户
      text, // 这里是用户当前识别成功的祝福语
      "长按识别二维码进入",
      "声趣新尚·悦享好礼"
    ],
    positions: {
      image: [
        { x: 0, y: 0, width: 700, height: 1600 },
        { x: 24, y: 274, width: 144, height: 144, shape: "circle" },
        { x: 156, y: 340, width: 414, height: 106 },
        { x: 268, y: 1262, width: 176, height: 176 }
      ],
      text: [
        {
          x: 188,
          y: 318,
          font: "500 26px Source Han Sans CN",
          color: "#AD0477"
        },
        {
          x: 199,
          y: 384,
          font: "500 28px Source Han Sans CN",
          color: "#4B2D80",
          maxWidth: 350
        },
        {
          x: 234,
          y: 1500,
          font: "500 28px Source Han Sans CN",
          color: "#6250E2"
        },
        {
          x: 245,
          y: 1540,
          font: "500 28px Source Han Sans CN",
          color: "#6250E2"
        }
      ]
    }
  });
  posterUrl.value = url;
};

defineExpose({ showPoster, hidePoster });
</script>

<style scoped></style>
