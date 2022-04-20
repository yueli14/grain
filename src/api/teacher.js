import request from '@/utils/request'

const BASE_API = process.env.VUE_APP_BASE_API
export default {
  /**
   *  查询老师对应getPageTeacher接口
   * @param now
   * @param limit
   * @param teacherQuery
   * @returns {AxiosPromise}
   */
  async getTeacherList(now, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pagefilter/${now}/${limit}`,
      method: 'post',
      //RequestBody传过来的数据必须时json
      data: teacherQuery
    })
  },
  /**
   *逻辑删除
   * @param id
   * @returns {AxiosPromise<never>}
   */
  async deleteTeacherById(id) {
    return request({
      url: `/eduservice/teacher/delete/${id}`,
      method: 'delete'
    })
  },
  /**
   * 添加讲师
   * @param teacher
   * @returns {AxiosPromise<never>}
   */
  async addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/add`,
      method: 'post',
      data: teacher
    })
  },
  /**
   * 根据id查询
   * @param id
   * @returns {AxiosPromise<never>}
   */
  async getTeacherById(id) {
    return request({
      url: `/eduservice/teacher//find/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改
   * @param teacher
   * @returns {AxiosPromise<never>}
   */
  async updateTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/update`,
      method: 'put',
      data: teacher
    })
  },
  async getAllTeacher() {
    return request({
      url: `/eduservice/teacher/findall`,
      method: 'get'
    })
  }
}
