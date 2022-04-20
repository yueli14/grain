import request from '@/utils/request'

export default {
  async getVideoById(id) {
    return request({
      url: '/eduservice/video/get/' + id,
      method: 'get'
    })
  },
  async deleteVideoById(id) {
    return request({
      url: '/eduservice/video/delete/' + id,
      method: 'delete'
    })
  },
  async addVideoById(T) {
    return request({
      url: '/eduservice/video/add',
      method: 'post',
      data: T
    })
  },
  async updateVideo(T) {
    return request({
      url: '/eduservice/video/update',
      method: 'put',
      data: T
    })
  },
  async deleteVideoOnAliyun(id) {
    return request({
      url: '/eduvod/video/delete/' + id,
      method: 'delete'
    })
  }
}
