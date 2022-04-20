<template>
  <!--region表格-->
  <el-form :model="teacher" :rules="rules" ref="teacher" label-width="100px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="teacher.name"></el-input>
    </el-form-item>
    <el-form-item label="等级" prop="level">
      <el-select v-model="teacher.level" placeholder="请选择" required>
        <el-option label="高级讲师" :value=1></el-option>
        <el-option label="首席讲师" :value=2></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="intro">
      <el-input v-model="teacher.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
    </el-form-item>
    <el-form-item label="生涯" prop="career">
      <el-input v-model="teacher.career"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model.number="teacher.sort"></el-input>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <el-upload
        class="avatar-uploader"
        :action="baseurl+`/eduoss/file/load`"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!--    实现头像上传-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('teacher')" :disabled="saveBtnDisabled">保存</el-button>
      <el-button @click="resetForm('teacher')">重置</el-button>
    </el-form-item>
  </el-form>
  <!--endregion-->
</template>

<script>
import teacher from '@/api/teacher'

export default {
  name: 'AddTeacher',
  data() {
    return {
      baseurl: process.env.VUE_APP_BASE_API,
      teacher: {
        avatar: ''
      },
      //表格检验规则
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 13, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择' }

        ],
        intro: [
          { required: true, message: '请输入简介', trigger: 'blur' }

        ],
        career: [
          { required: true, message: '请输入生涯', trigger: 'blur' }

        ],
        sort: [
          { required: true, message: '请输入数字', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ]
      },
      saveBtnDisabled: false
    }
  },
  mounted() {
    //根据路径中的id判断是否进行数据回显
    if (this.$route.params.id) {
      let id = this.$route.params.id
      this.getTeacherInfoByID(id)
    }
  },
  methods: {
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAndUpdate()
        } else {
          this.$message.warning('请输入内容')
          return false
        }
      })
    },
    //判断
    addAndUpdate() {
      if (this.$route.params.id) {
        this.update()
      } else {
        this.add()
      }

    },
    //根据id查询
    async getTeacherInfoByID(id) {
      var r = await teacher.getTeacherById(id)
      this.teacher = r.data.teacher
    },
    //修改
    async update() {

      var result = await teacher.updateTeacher(this.teacher)
      if (result.code === 20000) {
        this.$message({
          type: 'success',
          message: result.message
        })
        //重定向
        this.$router.push({ path: '/teacher/list' })
      } else {
        this.$message.error(result.message)
      }
    },
    //添加
    async add() {
      // console.log(this.teacher)
      var result = await teacher.addTeacher(this.teacher)
      if (result.code === 20000) {
        this.$message({
          type: 'success',
          message: result.message
        })
        //重定向
        this.$router.push({ path: '/teacher/list' })
      } else {
        this.$message.error(result.message)
      }
    },
    //重置表格
    resetForm(tearcher) {
      this.$refs[tearcher].resetFields()
    },
    //  实现文件上传
    handleAvatarSuccess(res, file) {
      // this.teacher.avator = URL.createObjectURL(file.raw);
      // console.log(URL.createObjectURL(file.raw))
      // console.log(res);
      if (res.code === 20000) {
        this.banner.imageUrl = res.data.url
        this.$message.success(res.message)
      } else {
        this.$message.warning(r.message)
      }
      // console.log(this.teacher.avatar)
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
