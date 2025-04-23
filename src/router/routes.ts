import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "ASR" },
    children: [
      {
        path: "ASR",
        name: "ASR",
        component: () => import("@/views/ASR/index.vue")
      },
      {
        path: "HzzAct",
        name: "HzzAct",
        component: () => import("@/views/HzzAct/index.vue")
      },
      {
        path: "AddAddress",
        name: "AddAddress",
        component: () => import("@/views/AddAddress/index.vue")
      }
    ]
  }
];

export default routes;
