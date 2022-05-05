import request from "../utils/request";

export default {
  async login(loginInfo) {
    return request({
      url: '/educenter/center/login',
      method: 'post',
      data: loginInfo
    })
  },
  async getLoginInfo() {
    return request({
      url: '/educenter/center/get/login/info',
      method: 'get'
    })
  },
}
