<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="选择讲师头衔">
          <!-- 数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number-->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->


      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imageCropperShow = true">更换头像</el-button>
        <!--v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imageCropperShow"
          :width="300"
          :height="300"
          :key="imageCropperKey"
          :url="BASE_API + '/eduOss/fileOss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //调用teacher.js文件
  import teacherApi from '@/api/edu/teacher'
  //引入头像组件
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components:{ImageCropper, PanThumb},
    data() {
      return{
        teacher:{//teacher对象中的内容为空也可以
          name:'',
          sort:0,
          level:1,
          career:'',
          intro:'',
          avatar:'',
        },
        imageCropperShow:false, //上传弹框的组件是否显示
        imageCropperKey:0,//上传组件key值
        saveBtnDisabled:false, //保存按钮是否禁用，防止重复提交
        BASE_API:process.env.BASE_API, //获取config配置文件里dev.env.js里的地址
      }

    },
    created() {
     this.init()
    },

    watch:{//监听
      $route(to,from){//路由变化方式，路由发生变化，方法执行
        this.init()
      }
    },

    methods: {
      close(){//关闭上传弹框的方法
        this.imageCropperShow=false
        this.imageCropperKey = this.imageCropperKey + 1
      },
      cropSuccess(data){//上传成功的方法
        //上传成功返回图片地址
        this.imageCropperShow=false
        this.imageCropperKey = this.imageCropperKey + 1
        this.teacher.avatar = data.url
      },
      init(){
        //判断路径是否有id值
        if(this.$route.params&&this.$route.params.id){
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
        }else{//路径中没有id值，清空表单
          this.teacher = {}
        }
      },

      getInfo(id){
        teacherApi.getTeacherInfo(id)
          .then(response => {
            this.teacher = response.data.teacher
          })
      },


      saveOrUpdate(){
        //判断修改还是添加，根据teacher是否有id值
        if (!this.teacher.id){
          //添加
          this.saveTeacher()
        }else {
          //修改
          this.updateTeacher()
        }
      },
      //修改讲师的方法
      updateTeacher(){
        teacherApi.updateTeacher(this.teacher)
          .then(
            response => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              //回到页面，路由跳转
              this.$router.push({path:'/teacher/table'})
            }
          )
      },

      //添加讲师方法
      saveTeacher(){
        teacherApi.addTeacher(this.teacher)
          .then(
            response => {//请求成功
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              //回到页面，路由跳转
              this.$router.push({path:'/teacher/table'})
            }
          )
          .catch()
      }
    }

  }


</script>
