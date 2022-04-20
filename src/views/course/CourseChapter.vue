<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-button type="text" @click="dialogFormVisible = true">添加章节</el-button>
    <!--    region 章节表单-->
    <el-dialog title="章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter" :rules="rules" ref="chapter">
        <el-form-item label="章节名称" prop="title">
          <el-input v-model="chapter.title" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="chapter.sort">
          <el-input v-model="chapter.sort" :min="0" controls-position="right"
                    placeholder="请输入数字"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChapter">取消</el-button>
        <el-button type="primary" @click="submitForm('chapter')">确 定</el-button>
      </div>
    </el-dialog>
    <!--    endregion-->

    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterList"
        :key="chapter.id"
      >
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style="{float: right}" type="text" @click="openAddVideo(chapter.id)">添加课时</el-button>
            <el-button style="{float: right}" type="text" @click="openUpdateChapter(chapter.id)">编辑</el-button>
            <el-button style="{float: right}" type="text" @click="deleteChapter(chapter.id)">删除</el-button>
         </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id"
          >
            <p>{{ video.title }}
              <span class="acts">
                 <el-button type="text" @click="openUpdateVideo(video.id)">编辑</el-button>
                 <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步
        </el-button>
      </el-form-item>
    </el-form>
    <!--    region 小节表单-->
    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" :rules="rules2" ref="video">
        <el-form-item label="课时标题" prop="title">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序" prop="video.sort">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费" prop="isFree">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1" :value="1">免费</el-radio>
            <el-radio :label="0" :value="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/upload'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVideo">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary"
                   @click="submitForm2('video')"
        >确 定
        </el-button>
      </div>
    </el-dialog>

    <!--    endregion-->
  </div>
</template>

<script>
import chapter from '@/api/chapter'

import video from '@/api/video'

export default {
  name: 'CourseChapter',
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      id: '',
      dialogFormVisible: false,
      dialogVideoFormVisible: false,
      saveVideoBtnDisabled: false,
      chapter: {},
      video: {},
      chapterList: [],
      // 保存按钮是否禁用
      saveBtnDisabled: false,

      rules: {
        title: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入数字', trigger: 'blur' }
        ]
      },
      rules2: {
        title: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入数字', trigger: 'blur' }
        ],
        isFree: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getAllChapter(this.id)
    } else {
      this.$router.push({ path: '/course/info' })
    }
    this.$nextTick(() => this.getAllChapter(this.id))
  },
  methods: {
    previous() {
      this.$router.push({ path: '/course/info/' + this.id })
    },
    next() {
      this.$router.push({ path: '/course/publish/' + this.id })
    },
    //region章节操作
    closeChapter() {
      this.dialogFormVisible = false
      this.chapter = ''
    },
    async getAllChapter(id) {
      let r = await chapter.getAllChapter(id)
      if (r.code === 20000) {
        this.chapterList = r.data.chapter
      } else {
        this.$message.warning('拉取数据失败')
      }
    },
    async openUpdateChapter(id) {
      this.dialogFormVisible = true
      let r = await chapter.getChapterById(id)
      if (r.code === 20000) {
        this.chapter = r.data.chapter
      }
    },
    //
    addAndUpdateChapter() {
      this.saveBtnDisabled = true
      if (!this.chapter.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
      this.saveBtnDisabled = false
    },
    async addChapter() {
      this.chapter.courseId = this.id
      let r = await chapter.addChapter(this.chapter)
      if (r.code === 20000) {
        this.$message.success(r.message)
        this.chapter.title = ''// 重置章节标题
        this.chapter.sort = 0// 重置章节标题
        this.getAllChapter(this.id)
      }
    },
    async deleteChapter(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let r = await chapter.deleteChapter(id)
        this.$message({
          type: 'success',
          message: r.message
        })
        this.getAllChapter(this.id)
      })

    },
    async updateChapter() {
      this.dialogFormVisible = true
      // this.chapter=chapter.getChapterById(id)
      let r = await chapter.updateChapter(this.chapter)
      if (r.code === 20000) {
        this.$message.success(r.message)
        this.chapter = ''
        this.getAllChapter(this.id)
      }
    },
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAndUpdateChapter()
          this.dialogFormVisible = false
        } else {
          this.$message.warning('请输入内容')
          return false
        }
      })
    },
    //endregion
    //region小节操作
    //表单验证
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAndUpdateVideo()
          this.dialogVideoFormVisible = false
        } else {
          this.$message.warning('请输入内容')
          return false
        }
      })
    },
    async openUpdateVideo(id) {
      this.dialogVideoFormVisible = true
      let r = await video.getVideoById(id)
      if (r.code === 20000) {
        console.log(r.data.video)
        this.video = r.data.video
      }
    },
    //
    addAndUpdateVideo() {
      // console.log(this.video)
      this.saveVideoBtnDisabled = true
      if (!this.video.id) {
        this.addVideo()
      } else {
        this.updateVideo()
      }
      this.saveVideoBtnDisabled = false
    },
    openAddVideo(chapterId) {
      this.dialogVideoFormVisible = true
      this.video.courseId = this.id
      this.video.chapterId = chapterId
    },
    async addVideo() {
      let r = await video.addVideoById(this.video)
      if (r.code === 20000) {
        this.$message.success(r.message)
        this.video = ''
        this.getAllChapter(this.id)
      }
    },
    async deleteVideo(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let r = await video.deleteVideoById(id)
        this.$message({
          type: 'success',
          message: r.message
        })
        this.getAllChapter(this.id)
      })

    },
    async updateVideo() {
      let r = await video.updateVideo(this.video)
      if (r.code === 20000) {
        this.$message.success(r.message)
        this.video = ''
        this.getAllChapter(this.id)
      }
    },
    closeVideo() {
      this.dialogVideoFormVisible = false
      this.video = ''
    },
    //  endregion
    // region视频上传操作
    // 成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId
      this.video.videoOriginalName = file.name
      this.$message.success('上传成功')
    },
    // 视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    // 弹出确认删除框
    beforeVodRemove(file, fileLis) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 点击确认时，删除服务端的文件
    handleVodRemove(file, fileLis) {
      video.deleteVideoOnAliyun(this.video.videoSourceId).then(response => {
        this.video.videoSourceId = ''
        this.video.videoOriginalName = ''
        this.fileList = []
        this.$message({
          type: 'success',
          message: response.message
        })
      })

    }
    // endregion
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
  /*解决span中的button无法点击问题，提高优先级*/
  position: relative;
  z-index: 1;
  width: auto;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
  position: relative;
}
</style>
