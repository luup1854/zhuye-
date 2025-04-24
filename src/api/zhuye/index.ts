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
export const putFeedbackService = (id, username, feedback) => {
  return http.request({
    url: `/zyb/student/stuFeedback?id=${id}&username=${username}&feedback=${feedback}`,
    method: "put"
  });
};
export const loginStu = (username: string) => {
  return http.request({
    url: `/zyb/student/login?username=${username}`,
    method: "post"
  });
};
export const getStuFeedback = id => {
  return http.request({
    url: `/zyb/student/Feedback?id=${id}`,
    method: "get"
  });
};

export const getStuCampus = username => {
  return http.request({
    url: `/zyb/student/campus_stu?username=${username}`,
    method: "get"
  });
};

export const deleteFeedback = (username, id) => {
  return http.request({
    url: `/zyb/student/stu_feedback?id=${id}&username=${username}`,
    method: "put"
  });
};
