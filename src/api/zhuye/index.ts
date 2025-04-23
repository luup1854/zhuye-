//封装请求
import { http } from "@/utils/http";

export const getCampusService = () => {
  return http.request({
    url: "/zyb/student/campusIng",
    method: "get"
  });
};

export const applicationService = (data: any) => {
    return http.request({
   url: "/zyb/student/applicationStu",
    method: "post",
   data: data
  });
    };
