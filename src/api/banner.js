import request from '@/utils/request'

export default {
  async getBannerList(now, limit, teacherQuery) {
    return request({
      url: `/educms/banner/admin/page/${now}/${limit}`,
      method: 'get'
    })
  },
  async deleteBannerById(id) {
    return request({
      url: `/educms/banner/admin/delete/${id}`,
      method: 'delete'
    })
  },
  async addBanner(banner) {
    return request({
      url: `/educms/banner/admin/add`,
      method: 'post',
      data: banner
    })
  },
  async getBannerById(id) {
    return request({
      url: `/educms/banner/admin/get/${id}`,
      method: 'get'
    })
  },
  async updateBanner(banner) {
    return request({
      url: `/educms/banner/admin/update`,
      method: 'put',
      data: banner
    })
  }
}
