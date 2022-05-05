import request from "../utils/request";

export default {
  async creatOrder(courseId) {
    return request({
      url: `/eduorder/order/user/create/order/${courseId}`,
      method: 'post',

    })
  },
  async getOrder(orderNo) {
    return request({
      url: `/eduorder/order/user/get/order/${orderNo}`,
      method: 'get'
    })
  },
}
