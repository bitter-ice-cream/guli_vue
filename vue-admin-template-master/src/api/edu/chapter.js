import request from '@/utils/request'

export default {
  //1根据课程id获取章节小节数据列表
  getAllChapterVideo(courseId){
    return request({
      url: '/eduService/eduChapter/getChapterVideo/'+courseId,
      method: 'get',
    })
  },
  //2添加章节
  addChapter(eduChapter){
    return request({
      url: '/eduService/eduChapter/addChapter',
      method: 'post',
      data:eduChapter,
    })
  },
  //3根据章节id查询
  getChapter(chapterId){
    return request({
      url: '/eduService/eduChapter/getChapterInfo/'+chapterId,
      method: 'get',
    })
  },

  //4修改章节
  updateChapter(eduChapter){
    return request({
      url: '/eduService/eduChapter/updateChapter',
      method: 'post',
      data:eduChapter,
    })
  },

  //5删除章节
  deleteChapter(chapterId){
    return request({
      url: '/eduService/eduChapter/'+chapterId,
      method: 'delete',
    })
  },

}
