<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类  -->
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类"
                   @change='subjectLevelOneChanged'>
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          ></el-option>
        </el-select>

        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          ></el-option>
        </el-select>
      </el-form-item>


      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduOss/fileOss/upload'"
          class="avatar-uploader">
          <img :src="courseInfo.cover"/>
        </el-upload>
      </el-form-item>


      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
        元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>


<script>
  import course from "@/api/edu/course";
  import subject from "@/api/edu/subject";
  import Tinymce from "@/components/Tinymce";  //引入组件

  export default {
    //声明组件
    components:{Tinymce},
    data() {
      return {
        saveBtnDisabled: false,
        courseInfo: {
          title: "",
          subjectId: "",//二级分类id
          subjectParentId: "",//一级分类id
          teacherId: "",
          lessonNum: 0,
          description: "",
          cover: "/static/1.jpg",
          price: 0,
        },
        courseId:'',
        teacherList: [],//封装所有讲师
        subjectOneList: [],//一级分类列表
        subjectTwoList: [],//二级分类列表
        BASE_API: process.env.BASE_API
      }
    },
    created() {
      //获取路由的id值
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        //根据id查询章节和小节
        this.getInfo()
      }else{
        //初始化讲师
        this.getListTeacher()
        //初始化一级分类列表
        this.getOneSubject()
      }
    },
    watch:{//监听
      $route(to,from){//路由变化方式，路由发生变化，方法执行
        this.courseInfo={title: "",
          subjectId: "",//二级分类id
          subjectParentId: "",//一级分类id
          teacherId: "",
          lessonNum: 0,
          description: "",
          cover: "/static/1.jpg",
          price: 0,}
        //初始化讲师
        this.getListTeacher()
        //初始化一级分类列表
        this.getOneSubject()
      }
    },
    methods: {
      //根据课程id查询信息
      getInfo(){
        course.getCourseInfo(this.courseId)
          .then(resp=>{
            this.courseInfo = resp.data.courseInfoVo
            //1查询所有的分类，包含一级和二级
            subject.getSubjectList()
              .then(response=>{
                //2获取所有一级分类
                this.subjectOneList = response.data.list
                //3把所有的一级分类数组进行遍历
                for (let i = 0; i < this.subjectOneList.length; i++) {
                  //比较当前courseInfo里面的一级分类id和所有的一级分类id
                  let oneSubject = this.subjectOneList[i]
                  if (this.courseInfo.subjectParentId == oneSubject.id ){
                    //获取一级分类的所有二级分类
                    this.subjectTwoList = oneSubject.children
                  }
                }
              })
            //初始化讲师
            this.getListTeacher()
          })
      },

      addCourse(){
        course.addCourseInfo(this.courseInfo)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '添加课程信息成功'
            })
            //跳转第二步
            this.$router.push({path: '/course/chapter/' + response.data.courseId})
          })
      },
      updateCourse(){
        course.updateCourseInfo(this.courseInfo)
          .then(response=>{
            //提示
            this.$message({
              type: 'success',
              message: '修改课程信息成功'
            })
            //跳转第二步
            this.$router.push({path: '/course/chapter/' + this.courseId})
          })
      },

      saveOrUpdate() {
        //判断添加还是修改
        if(!this.courseInfo.id){
          this.addCourse()
        }else {
          this.updateCourse()
        }
      },
      //查询所有的讲师
      getListTeacher() {
        course.findAllTeacher()
          .then(response => {
            this.teacherList = response.data.items
          })
      },
      //查询所有一级分类
      getOneSubject() {
        subject.getSubjectList()
          .then(response => {
            this.subjectOneList = response.data.list
          })
      },
      //点击某个一级分类，触发change,显示对应二级分类
      subjectLevelOneChanged(value) {
        for (let i = 0; i < this.subjectOneList.length; i++) {
          if (this.subjectOneList[i].id === value) {
            this.subjectTwoList = this.subjectOneList[i].children
            this.courseInfo.subjectId = ""
          }
        }
      },
      //上传封面成功
      handleAvatarSuccess(res,file) {
        this.courseInfo.cover = res.data.url

      },
      //上传封面之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
    }
  }

</script>
<style scoped>
  .tinymce-container {
    line-height: 29px;
  }
</style>
