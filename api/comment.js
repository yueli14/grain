import request from "../utils/request";

export default {
  getPageList(current, size, courseId) {
    return request({
      url: `/eduservice/comment/user/page/${current}/${size}/${courseId}`,
      method: 'get',

    })
  },
  addComment(comment) {
    return request({
      url: `/eduservice/comment/user/add/comment`,
      method: 'post',
      data: comment
    })
  }
}
