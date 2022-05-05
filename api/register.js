import request from "../utils/request";

export default {
  async getCode(mobile) {
    return request({
      url: `/edumsm/msm/send/${mobile}`,
      method: 'get',
    })
  },

  async registerUser(userInfo) {
    return request({
      url: `/educenter/center/register`,
      method: 'post',
      data: userInfo
    })
  },
}
