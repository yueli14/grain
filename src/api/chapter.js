import request from "@/utils/request";

export default {
  async getAllChapter(id) {
    return request({
      url: `/eduservice/chapter/all/${id}`,
      method: `get`,
    })
  },
  async getChapterById(id) {
    return request({
      url: `/eduservice/chapter/get/${id}`,
      method: `get`,
    })
  },
  async updateChapter(chapter) {
    return request({
      url: `/eduservice/chapter/update`,
      method: `put`,
      data: chapter
    })
  },
  async deleteChapter(id) {
    return request({
      url: `/eduservice/chapter/delete/${id}`,
      method: `delete`,
    })
  },
  async addChapter(chapter) {
    return request({
      url: `/eduservice/chapter/add`,
      method: `post`,
      data: chapter
    })
  },
}
