import request from '@/utils/request'

export default {
  //1课程分类列表
  addCourseInfo(courseInfo){
    return request({
      url: '/eduService/course/addCourseInfo',
      method: 'post',
      data:courseInfo,
    })
  },
  //2查询所有讲师信息
  findAllTeacher(){
    return request({
      url: '/eduService/teacher/findAll',
      method: 'get',
    })
  },
  //3查询课程信息
  getCourseInfo(courseId){
    return request({
      url: '/eduService/course/getCourseInfo/'+courseId,
      method: 'get',
    })
  },
  //4更新课程信息
  updateCourseInfo(courseInfo){
    return request({
      url: '/eduService/course/updateCourseInfo',
      method: 'post',
      data:courseInfo,
    })
  },
  //5课程确认信息显示
  getPublishCourseInfo(courseId){
    return request({
      url: 'eduService/course/getPublishCourseInfo/'+courseId,
      method: 'get',
    })
  },

  //6课程最终发布
  publishCourse(courseId){
    return request({
      url: 'eduService/course/publishCourse/'+courseId,
      method: 'post',
    })
  },

  //7课程列表分页查询
  getPageList(page, limit, courseQuery) {
    return request({
      url: 'eduService/course/'+page+'/'+limit,
      method: 'post',
      data: courseQuery
    })
  },
  //8删除课程
  deleteCourse(courseId) {
    return request({
      url: 'eduService/course/'+courseId,
      method: 'post'
    })
  },
}


