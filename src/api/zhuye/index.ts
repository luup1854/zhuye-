//封装请求
import { http } from "@/utils/http";

export const getCampusService = () => {
  return http.request({
    url: "/zyb/student/campus",
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

type campusStu = {};
export const applicationService = (data: campusStu) => {
  return http.request({
    url: "/zyb/student/applicationStu",
    method: "post",
    data: data
  });
};
