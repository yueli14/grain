const BASE_API = process.env.VUE_APP_BASE_API
import request from '@/utils/request'

export default {
  async getAllSubject() {
    return request({
      url: `eduservice/subject/get/all`,
      method: 'get',
      //RequestBody传过来的数据必须时json
    })
  }
}
