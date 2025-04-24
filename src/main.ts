import { createApp } from "vue";
import { createPinia } from "pinia"; // 导入 Pinia
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 导入持久化插件
import router from "./router"; // 导入路由
import App from "./App.vue";

// jweixin
// import "./plugins/jweixin-1.3.2.js";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";
// import { initializeDarkMode } from "@/utils/dark-mode";

// 创建 Pinia 实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 使用持久化插件

// 初始化 Vue 应用
const app = createApp(App);

// 使用 Pinia 和路由
app.use(pinia);
app.use(router);

app.mount("#app");
