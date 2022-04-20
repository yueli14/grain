<template>
  <div>
    <!--region表格-->
    <el-form :model="banner" :rules="rules" ref="banner" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="banner.title"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input v-model="banner.linkUrl" placeholder="示例：/course"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="banner.sort"></el-input>
      </el-form-item>
      <el-form-item label="轮播图" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          :action="baseurl+`/eduoss/file/load`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--    实现头像上传-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('banner')" :disabled="saveBtnDisabled">保存</el-button>
        <el-button @click="resetForm('banner')">重置</el-button>
      </el-form-item>
    </el-form>
    <!--endregion-->
  </div>
</template>

<script>
import banner from '@/api/banner'

export default {
  name: 'AddBanner',
  data() {
    return {
      id: '',
      baseurl: process.env.VUE_APP_BASE_API,
      banner: {},
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 13, message: '长度在 3 到 13 个字符', trigger: 'blur' }
        ],

        linkUrl: [
          { required: true, message: '请输入简介', trigger: 'blur' }

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
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getBannerInfo(this.id)
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
    //重置表格
    resetForm(banner) {
      this.$refs[banner].resetFields()
    },
    //  实现文件上传
    handleAvatarSuccess(res, file) {
      // this.teacher.avator = URL.createObjectURL(file.raw);
      // console.log(URL.createObjectURL(file.raw))
      // console.log(res);
      if (res.code===20000){
        this.banner.imageUrl = res.data.url
        this.$message.success(res.message)
      }else {
        this.$message.warning(r.message)
      }

      // console.log(this.teacher.avatar)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    //判断
    addAndUpdate() {
      console.log(banner)
      if (this.id) {
        this.update()
      } else {
        this.add()
      }
    },
    async add() {
      let r = await banner.addBanner(this.banner)
      if (r.code === 20000) {
        this.$message.success(r.message)
        this.$router.push({ path: '/banner/list' })
      } else {
        this.$message.warning(r.message)
      }
    },
    async update() {
      let r = await banner.updateBanner(this.banner)
      if (r.code === 20000) {
        this.$message.success(r.message)
        this.$router.push({ path: '/banner/list' })
      } else {
        this.$message.warning(r.message)
      }
    },
    async getBannerInfo(id) {
      let r = await banner.getBannerById(id)

      if (r.code === 20000) {
        this.banner = r.data.banner
      } else {
        this.$message.warning('数据拉取失败，请稍后再试')
      }
    }

  }
}
</script>

<style scoped>
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
