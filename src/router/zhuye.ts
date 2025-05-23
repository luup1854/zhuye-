import Layout from "@/views/zhuye/layout.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: { name: "Profile" },
    children: [
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
  },
  {
    path: "/User/Active",
    name: "UserActive",
    component: () => import("@/views/zhuye/StuActive.vue"),
    meta: { title: "参加的活动" }
  }
];

export default routes;
