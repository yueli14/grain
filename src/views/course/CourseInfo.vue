<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-form :model="courseInfo" :rules="rules" ref="courseInfo" label-width="120px">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model="courseInfo.title" placeholder="示例：机器学习项目课：从基础到搭建项目">
        </el-input>
      </el-form-item>
      <!-- 所属分类  -->
      <el-form-item label="分类" prop="subjectId">
        <el-cascader
          placeholder="请选择分类"
          v-model="courseInfo.subjectId"
          :options="subjectList"
          :props="{ expandTrigger: 'hover' ,label:`title`,value:`id`}"
        ></el-cascader>
      </el-form-item>
      <!-- 课程讲师  -->
      <el-form-item label="课程讲师" prop="teacherId">
        <el-select v-model="courseInfo.teacherId" filterable placeholder="请输入关键词或者直接选择">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时" prop="lessonNum">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"
                         placeholder=""
        ></el-input-number>
      </el-form-item>
      <!-- 课程简介  -->
      <el-form-item label="课程简介" prop="description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6}"
          placeholder="请输入课程简介内容"
          v-model="courseInfo.description"
        >
        </el-input>
      </el-form-item>
      <!-- 课程封面  -->
      <el-form-item label="封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="baseurl+`/eduoss/file/load`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="this.courseInfo.cover" :src="this.courseInfo.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格" prop="price">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="">元
        </el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="submitForm('courseInfo')">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher'
import course from '@/api/course'
import subject from '@/api/subject'

export default {
  name: 'CourseInfo',
  data() {
    return {
      courseInfo: {
        id: '',
        subjectId: '',
        subjectParentId: ''
      },
      baseurl: process.env.VUE_APP_BASE_API,
      idCopy: '',
      //表格检验规则
      rules: {
        title: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        subjectId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        teacherId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        lessonNum: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        cover: [
          { required: false, message: '请输入', trigger: 'blur' }
        ]
      },
      teacherList: [],
      subjectList: [],
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },
  mounted() {
    //
    if (this.$route.params.id) {
      this.idCopy = this.$route.params.id
      this.getCourseById(this.idCopy)
    }
    this.getAllTeacher()
    this.getAllSubject()
  },
  methods: {
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateOrAdd()
        } else {
          this.$message.warning('请输入内容')
          return false
        }
      })
    },
    async updateCourse() {
      //处理courseInfo中的subjectId
      if (this.courseInfo.subjectId.length !== 1) {
        this.courseInfo.subjectParentId = this.courseInfo.subjectId[0]
        this.courseInfo.subjectId = this.courseInfo.subjectId[this.courseInfo.subjectId.length - 1]
      }
      this.courseInfo.id = this.idCopy
      let r = await course.updateCourse(this.courseInfo)
      if (r.code === 20000) {
        // console.log(r)
        this.id = r.data.courseId
        // console.log(this.id)
        this.$message({
          type: 'success',
          message: r.message
        })
        this.$router.push({ path: '/course/chapter/' + this.id })
      } else {
        this.$message.error('保存失败，请重试')
      }
    },
    async addCourse() {
      // console.log(this.courseInfo.subjectId);
      // 处理courseInfo中的subjectId
      if (this.courseInfo.subjectId.length !== 1) {
        this.courseInfo.subjectParentId = this.courseInfo.subjectId[0]
        this.courseInfo.subjectId = this.courseInfo.subjectId[this.courseInfo.subjectId.length - 1]
      }
      this.$message({
        type: 'success',
        message: r.message
      })
      // console.log(this.courseInfo)
      let r = await course.addCourse(this.courseInfo)
      if (r.code === 20000) {
        // console.log(r)
        this.id = r.data.courseId
        // console.log(this.id)
        this.$router.push({ path: '/course/chapter/' + this.id })
      } else {
        this.$message.error('保存失败，请重试')
      }
    },
    async getAllTeacher() {
      var r = await teacher.getAllTeacher()
      if (r.code === 20000) {
        this.teacherList = r.data.teacher
      } else {
        this.$message.error('下拉菜单拉取数据失败')
      }
    },
    async getAllSubject() {
      var r = await subject.getAllSubject()
      // 得到想要的数据格式
      if (r.code === 20000) {
        this.subjectList = r.data.list
        for (let i = 0; i < this.subjectList.length; i++) {
          for (let j = 0; j < this.subjectList[i].children.length; j++) {
            delete this.subjectList[i].children[j].children
          }
        }
      } else {
        this.$message.error('下拉菜单拉取数据失败')
      }
    },
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
      // console.log(this.courseInfo.cover)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async getCourseById(id) {
      let r = await course.getCourseById(id)
      if (r.code === 20000) {
        this.courseInfo = r.data.course
        this.courseInfo.subjectId = [this.courseInfo.subjectParentId, this.courseInfo.subjectId]
      } else {
        this.$message.error('数据请求失败')
      }
    },
    //判断是修改还是保存
    updateOrAdd() {
      if (this.$route.params.id) {
        this.updateCourse()
      } else {
        this.addCourse()
      }
    }

  }

}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
