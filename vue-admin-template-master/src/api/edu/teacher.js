import request from '@/utils/request'

export default {
  //1讲师列表(条件查询分页)
  getTeacherListPage(current,limit,teacherQuery){
    return request({
      // url: '/eduService/edu-edu/pageTeacherCondition/'+current+'/'+limit,
      url: `/eduService/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      //teacherQuery条件对象，后端使用RequestBody获取数据
      //data表示把对象转为json进行传递到接口里面
      data:teacherQuery
    })
  },
  deleteTeacherById(id){
    //删除讲师
    return request({
      url: `/eduService/teacher/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher){
    //添加讲师
    return request({
      url: `/eduService/teacher/addTeacher`,
      method: 'post',
      data:teacher
    })
  },
  getTeacherInfo(id){
    //根据id查询讲师
    return request({
      url: `/eduService/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },

  updateTeacher(teacher){
    //修改讲师
    return request({
      url: `/eduService/teacher/updateTeacher`,
      method: 'post',
      data:teacher
    })
  },



}


