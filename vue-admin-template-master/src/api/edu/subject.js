import request from '@/utils/request'

export default {
  //1课程分类列表
  getSubjectList(){
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get',
    })
  },




}


