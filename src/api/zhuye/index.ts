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
export const putFeedbackService = (data: any) => {
  return http.request({
    url: "/zyb/student/stuFeedback",
    method: "put",
    data: data
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
