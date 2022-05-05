import request from "../utils/request";

export default {
  async getAllBanner(){
    return request({
      url:"/educms/banner/user/get/all",
      method:"get"
    })
  },
  async getIndexCourseAndTeacher(){
    return request({
      url:"eduservice/index/user/get/index",
      method:"get"
    })
  }
}
