import request from "../utils/request";

export default {
  async getCourseByTeacherId(teacherId) {
    return request({
      url: `/eduservice/course/user/get/teacher/${teacherId}`,
      method: 'get'
    })
  },
  async getCoursePageByQuery(current, size, courseQuery) {
    return request({
      url: `/eduservice/course/user/get/course/page/${current}/${size}`,
      method: 'post',
      data: courseQuery
    })
  },
  async getChapter(id) {
    return request({
      url: `/eduservice/course/user/get/chapter/${id}`,
      method: 'get',

    })
  },
  async getSubject() {
    return request({
      url: `/eduservice/course/user/get/subject`,
      method: 'get',

    })
  },
  async getFrontCourseId(id) {
    return request({
      url: `/eduservice/course/user/get/course/info/${id}`,
      method: 'get',

    })
  },
}
