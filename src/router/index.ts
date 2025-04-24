import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./zhuye";
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
// import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";
import { useMemberStore } from "@/store/modules/member";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}

// 路由前置守卫
router.beforeEach((to: toRouteType, from, next: NavigationGuardNext) => {
  // 获取 memberStore
  const memberStore = useMemberStore();

  // 检查是否需要登录
  if (!memberStore.profile.username && to.path !== "/Profile") {
    // 如果没有 username 且当前路径不是 /Profile，则跳转到 /Profile
    next({ path: "/Profile" });
  } else {
    // 路由缓存
    useCachedViewStoreHook().addCachedView(to);
    // 页面 title
    setPageTitle(to.meta.title);
    next();
  }
});

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
