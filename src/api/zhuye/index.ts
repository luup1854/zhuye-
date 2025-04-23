//封装请求
import { http } from "@/utils/http";

export const getCampusService = () => {
  return http.request({
    url: "/zyb/student/campusIng",
    method: "get"
  });
};

export const loginStu = (username: string) => {
  return http.request({
    url: "/zyb/student/login",
    method: "post",
    data: {
      username: username
    }
  });
};
