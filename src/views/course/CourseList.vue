<template>
  <div class="app-container">
    <!--    region 条件查询行内表单-->
    <el-form :inline="true" :model="courseQuery" ref="courseQuery" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="courseQuery.title" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="头衔">
        <el-select v-model="courseQuery.status" placeholder="头衔">
          <el-option value="Normal" label="已发布"></el-option>
          <el-option value="Draft" label="未发布"></el-option>
        </el-select>
      </el-form-item>
      <el-date-picker
        v-model="courseQuery.start"
        type="datetime"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始日期"
      >
      </el-date-picker>
      <el-date-picker
        v-model="courseQuery.end"
        type="datetime"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" @click="getList()" :disabled="saveBtnDisabled">查询</el-button>
      <el-button @click="resetData">清空</el-button>
    </el-form>
    <!--    endregion-->
    <!--region表格-->
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="60"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>序号: {{ scope.$index + 1 }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.$index + 1 }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="150"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>title: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag color="translate" size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="发布状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>发布状态: {{ scope.row.status === 'Normal' ? '已发布' : '未发布' }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="info" size="medium"> {{ scope.row.status === 'Normal' ? '已发布' : '未发布' }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        width="50"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>价格: {{ scope.row.price }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.price }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="课时"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>课时: {{ scope.row.lessonNum }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="small">{{ scope.row.lessonNum }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="浏览数"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>浏览数: {{ scope.row.viewCount }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag color="white" size="medium">{{ scope.row.viewCount }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="购买数"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>购买数: {{ scope.row.buyCount }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag color="white" size="medium">{{ scope.row.buyCount }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{ getTime(list[scope.$index].gmtCreate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编辑" width="400">
        <template slot-scope="scope">
          <!--         region路由跳转-->
          <router-link :to="`/course/info/`+scope.row.id">
            <el-button
              size="mini"
            >编辑课程基本信息
            </el-button>
          </router-link>
          <router-link :to="`/course/chapter/`+scope.row.id">
            <el-button
              size="mini"
            >编辑课程章节
            </el-button>
          </router-link>
          <!--          endregion-->
          <el-button
            size="mini"
            type="danger"
            :disabled="saveBtnDisabled"
            @click="handleDelete(scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--endregion-->
    <!--region分页条-->
    <div class="block">
      <!--      -->
      <el-pagination
        layout="total,prev, pager, next,jumper"
        :current-page="now"
        :page-size="limit"
        :total="total"
        @current-change="getList"
      >
      </el-pagination>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
import { getLocalTime } from '@/utils'
import course from '@/api/course'
import teacher from '@/api/teacher'

export default {
  name: 'CourseList',
  data() {
    return {
      // 数据
      list: [],
      //
      total: 0,
      now: 1,
      limit: 10,
      courseQuery: {},
      saveBtnDisabled: false
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    //删除
    async handleDelete(s) {
      this.saveBtnDisabled = true
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteCourseById(s)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      })
      this.saveBtnDisabled = false
    },
    // 显示数据
    getList(now = 1) {
      // 动态改值
      this.now = now
      course.getCourseList(this.now, this.limit, this.courseQuery)
        // 成功
        .then(
          response => {
            // console.log(response)
            this.list = response.data.course.records
            this.total = response.data.course.total
            // console.log(this.list)
          })
        // 失败
        .catch(error => this.$message.warning('数据拉取失败'))
    },
    // 时间格式转化器
    getTime(s) {
      return getLocalTime(s)
    },
    // 清空
    resetData() {
      this.courseQuery = {}
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
