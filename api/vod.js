import request from "../utils/request";

export default {
  async getAuth(id){
    return request({
      url:`/eduvod/video/get/auth/${id}`,
      method:"get"
    })
  }
}
