<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { showToast } from "vant";
import { http } from "@/utils/http";
import { getUserToken } from "@/utils/common";

const isShow = ref<boolean>(false);
const columns = ref<any[]>([[], [], []]);
const selectedProvince = ref();
const selectedCity = ref();
const selectedDistrict = ref();
const addressText = ref("必填，请选择 省/市/县");

const contacts = ref();
const province = ref();
const city = ref();
const area = ref();
const address = ref();
const phone = ref();
const aid = ref();

const fetchProvinces = async () => {
  const response = await http.request<
    Array<{ region_id: number; region_name: string }>
  >({
    url: "/cloud2.member.api/address/queryRegion?id=1&regionType=1",
    method: "get"
  });
  const provinces = response.map(item => ({
    value: item.region_id,
    text: item.region_name
  }));
  columns.value[0] = provinces;
  selectedProvince.value = provinces[0]?.value;
  await fetchCities(selectedProvince.value);
};

const fetchCities = async (provinceId: number) => {
  const response = await http.request<
    Array<{ region_id: number; region_name: string }>
  >({
    url: `/cloud2.member.api/address/queryRegion?id=${provinceId}&regionType=2`,
    method: "get"
  });
  const cities = response.map(item => ({
    value: item.region_id,
    text: item.region_name
  }));
  columns.value[1] = cities;
  selectedCity.value = cities[0]?.value;
  await fetchDistricts(selectedCity.value);
  return cities;
};

const fetchDistricts = async (cityId: number) => {
  const response = await http.request<
    Array<{ region_id: number; region_name: string }>
  >({
    url: `/cloud2.member.api/address/queryRegion?id=${cityId}&regionType=3`,
    method: "get"
  });
  const districts = response.map(item => ({
    value: item.region_id,
    text: item.region_name
  }));
  columns.value[2] = districts;
  selectedDistrict.value = districts[0]?.value;
  return districts;
};

const onChange = async (e: any) => {
  const { selectedOptions, columnIndex } = e;
  if (columnIndex === 0) {
    selectedProvince.value = selectedOptions[0]?.value;
    const cities = await fetchCities(selectedProvince.value);
    columns.value[1] = cities;
  }
  if (columnIndex === 1) {
    selectedCity.value = selectedOptions[1]?.value;
    const districts = await fetchDistricts(selectedCity.value);
    columns.value[2] = districts;
  }
  if (columnIndex === 2) {
    selectedDistrict.value = selectedOptions[2]?.value;
  }
};

const onConfirm = () => {
  province.value = columns.value[0].find(
    (item: any) => item.value === selectedProvince.value
  )?.text;
  city.value = columns.value[1].find(
    (item: any) => item.value === selectedCity.value
  )?.text;
  area.value = columns.value[2].find(
    (item: any) => item.value === selectedDistrict.value
  )?.text;
  addressText.value = `${province.value} / ${city.value} / ${area.value}`;
  isShow.value = false;
};

const validateForm = () => {
  if (!contacts.value) {
    showToast("收货人姓名不能为空");
    return false;
  }
  if (!address.value) {
    showToast("地址不能为空");
    return false;
  }
  if (!phone.value) {
    showToast("联系电话不能为空");
    return false;
  }
  if (phone.value.length < 11) {
    showToast("联系电话格式有误");
    return false;
  }
  if (!addressText.value || !address.value) {
    showToast("地址不能为空");
    return false;
  }
  return true;
};

const data = computed(() => ({
  aid: aid.value,
  contacts: contacts.value,
  address: address.value,
  phone: phone.value,
  province: province.value,
  city: city.value,
  area: area.value
}));

const save = () => {
  return http.request({
    url: "/cloud2.activity.api/marketAct/address/save",
    method: "post",
    params: {
      userToken: getUserToken()
    },
    data: data.value
  });
};

const submitAddress = async () => {
  if (!validateForm()) {
    return;
  }
  await save();
  showToast("保存成功");
};

onMounted(() => {
  const getAidFromHash = () => {
    const hash = window.location.hash;
    const queryString = hash.split("?")[1];
    if (!queryString) return null;

    const params = new URLSearchParams(queryString);
    return params.get("aid");
  };

  aid.value = getAidFromHash();
  fetchProvinces();
});
</script>

<template>
  <div
    class="relative min-h-full overflow-hidden base-bg bg-[url('https://gszy-oss.baijqr.cn/gansu_oss/gansu/mini_mall22/v2/lz-bgc1.png')]"
  >
    <div class="flex flex-col items-center">
      <div class="mt-[45px] font-bold text-[19px] text-[#6F6156]">
        黑中支悠享品鉴官
      </div>
      <div
        class="flex items-center w-[320px] h-[42px] rounded-3xl bg-white mt-[30px]"
      >
        <img
          src="https://gszy-oss.baijqr.cn/gansu_oss/gansu/common/user_icon.png"
          class="w-[30px] h-[30px] ml-4"
        />
        <input
          v-model="contacts"
          type="text"
          placeholder="必填，请输入收货人姓名"
          class="flex-1 bg-transparent outline-none ml-2 text-[#908E8F] placeholder-[#908E8F]"
        />
      </div>
      <div
        class="flex items-center w-[320px] h-[42px] rounded-3xl bg-white mt-[30px]"
      >
        <img
          src="https://gszy-oss.baijqr.cn/gansu_oss/gansu/common/address-icon.png"
          class="w-[30px] h-[30px] ml-4"
        />
        <div class="btn flex-1 ml-2 text-[#908E8F]" @click="isShow = true">
          {{ addressText }}
        </div>
      </div>
      <div
        class="flex items-center w-[320px] h-[42px] rounded-3xl bg-white mt-[30px]"
      >
        <img
          src="https://gszy-oss.baijqr.cn/gansu_oss/gansu/common/address-icon.png"
          class="w-[30px] h-[30px] ml-4"
        />
        <input
          v-model="address"
          type="text"
          placeholder="必填，请输入详细地址"
          class="flex-1 bg-transparent outline-none ml-2 text-[#908E8F] placeholder-[#908E8F]"
        />
      </div>
      <div
        class="flex items-center w-[320px] h-[42px] rounded-3xl bg-white mt-[30px]"
      >
        <img
          src="https://gszy-oss.baijqr.cn/gansu_oss/gansu/common/phone_icon.png"
          class="w-[30px] h-[30px] ml-4"
        />
        <input
          v-model="phone"
          type="text"
          placeholder="必填，请输入联系电话"
          class="flex-1 bg-transparent outline-none ml-2 text-[#908E8F] placeholder-[#908E8F]"
        />
      </div>

      <div
        class="text-[11px] w-[335px] text-[#DA8E54] font-extrabold px-4 mt-[30px]"
      >
        *
        恭喜您获得参与“黑中支悠享品鉴官”活动品鉴资格，请填写收件人相关信息；以上信息（收货人、详细地址、联系电话）我们将严格保密，仅用于邮寄品鉴礼品。请注意当前登录账户绑定手机号要与收到短信的手机号保持一致！地址收集截止时间为4月3日21:00:00
      </div>
      <div
        class="btn w-[320px] h-[42px] mt-[40px] flex items-center justify-center bg-gradient-to-r from-[#E2AF6C] to-[#F6D2A0] text-[#744C2F] text-[16px] font-bold rounded-lg"
        @click="submitAddress"
      >
        确认地址
      </div>
    </div>
  </div>

  <van-overlay
    :show="isShow"
    :custom-style="{ background: 'rgba(0, 0, 0, 0.5)' }"
    @click="isShow = false"
  >
    <div class="absolute bottom-0 w-full">
      <van-picker
        :columns="columns"
        @change="onChange"
        @cancel="isShow = false"
        @confirm="onConfirm"
      />
    </div>
  </van-overlay>
</template>

<style scoped>
:deep(.van-picker__confirm) {
  color: #da8e54 !important;
}
</style>
