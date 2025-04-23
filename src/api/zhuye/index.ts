//封装请求
import { http } from "@/utils/http";

export const getCampusService=()=>{
    return http.request({
        url:"/zyb/student/campus",
        method:"get"
    })
}