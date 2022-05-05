import request from "../utils/request";

export default {
  async getPageTeacher(current, size) {
    return request({
      url: `/eduservice/teacher/user/page/${current}/${size}`,
      method: 'get'
    })
  },
  async getTeacherById(id) {
    return request({
      url: `/eduservice/teacher/user/get/${id}`,
      method: 'get'
    })
  },
}
