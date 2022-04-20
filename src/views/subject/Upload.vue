<template>
  <el-form label-width="120px">
    <el-form-item label="信息描述">
      <el-tag type="info">excel模版说明</el-tag>
      <el-tag>
        <i class="el-icon-download"/>
        <a href="https://yueli14gulixueyuan.oss-cn-chengdu.aliyuncs.com/01.xlsx">点击下载模版</a>
      </el-tag>
    </el-form-item>
    <el-form-item label="请选择excel文件">
      <!--    accept限制文件类型-->
      <el-upload
        class="upload"
        ref="upload"
        :action="baseurl+`/eduservice/subject/uploadexcel`"
        :on-success="getSuccess"
        :on-error="getError"
        :limit="1"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :on-exceed="getOxce"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      baseurl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    getSuccess(response) {
      if (response.code === 20000) {
        this.$message({
          type: "success",
          message: response.message
        })
      }
    },
    getError(err) {
      this.$message.error(err.message)
    },
    getOxce() {
      this.$message({type: "warning", message: "只支持上传一个文件"}
      )
    }


  }
}
</script>

<style scoped>

</style>
