const BASE_API = process.env.VUE_APP_BASE_API
import request from '@/utils/request'

export default {
  async addCourse(t) {
    return request({
      url: `/eduservice/course/add/course`,
      method: `post`,
      data: t
    })
  },
  async updateCourse(t) {
    return request({
      url: `/eduservice/course/update`,
      method: `put`,
      data: t
    })
  },
  async getCourseById(id) {
    return request({
      url: `/eduservice/course/find/${id}`,
      method: `get`
    })
  },
  async getCoursePublishById(id) {
    return request({
      url: `/eduservice/course/get/publish/info/${id}`,
      method: `get`
    })
  },
  async publishCourseById(id) {
    return request({
      url: `/eduservice/course/publish/${id}`,
      method: `put`
    })
  },
  /**
   *  查询老师对应getPageTeacher接口
   * @param now
   * @param limit
   * @param teacherQuery
   * @returns {AxiosPromise}
   */
  async getCourseList(now, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pagefilter/${now}/${limit}`,
      method: 'post',
      // RequestBody传过来的数据必须时json
      data: courseQuery
    })
  },
  async getAllCourse() {
    return request({
      url: `/eduservice/course/findall`,
      method: 'get'
    })
  },
  /**
   *逻辑删除
   * @param id
   * @returns {AxiosPromise<never>}
   */
  async deleteCourseById(id) {
    return request({
      url: `/eduservice/course/delete/true/${id}`,
      method: 'delete'
    })
  }
}
