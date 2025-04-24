import Layout from "@/views/zhuye/layout.vue";
import path from "path";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: { name: "Index" },
    children: [
      {
        path: "Index",
        name: "Index",
        component: () => import("@/views/zhuye/IndexView.vue"),
        meta: { title: "首页" }
      },

      {
        path: "Active",
        name: "Active",
        component: () => import("@/views/zhuye/ActiveView.vue"),
        meta: { title: "活动" }
      },
      {
        path: "Profile",
        name: "Profile",
        component: () => import("@/views/zhuye/ProfileView.vue"),
        meta: { title: "我的" }
      }
    ]
  },
  {
    path: "/Detail",
    name: "Detail",
    component: () => import("@/views/zhuye/DetailsView.vue"),
    meta: { title: "活动详情" }
  },
  {
    path: "/Comment/:id",
    name: "Comment",
    component: () => import("@/views/zhuye/CommentView.vue"),
    meta: { title: "评论" }
  }
];

export default routes;
