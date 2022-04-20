<template>
  <div class="app">
    <!--    region 条件查询行内表单-->
    <el-form :inline="true" :model="teacherQuery" ref="teacherQuery" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="teacherQuery.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="头衔">
        <el-select v-model="teacherQuery.level" placeholder="头衔">
          <el-option :value="1" label="高级讲师"></el-option>
          <el-option :value="2" label="首席讲师"></el-option>
        </el-select>
      </el-form-item>
      <el-date-picker
        v-model="teacherQuery.start"
        type="datetime"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始日期"
      >
      </el-date-picker>
      <el-date-picker
        v-model="teacherQuery.end"
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
        width="180"
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
        label="姓名"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag color="translate" size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="头衔"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>头衔: {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="info" size="medium">{{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="资历"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>资历: {{ scope.row.career }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.career }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="简介"
        width="200"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>简介: {{ scope.row.intro }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="small">{{ scope.row.intro }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        sortable
        width="120"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>排序: {{ scope.row.sort }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag color="white" size="medium">{{ scope.row.sort }}</el-tag>
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

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--         region路由跳转-->
          <router-link :to="`/teacher/edit/`+scope.row.id">
            <el-button
              size="mini"
            >编辑
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
import teacher from '@/api/teacher'
import { getLocalTime } from '@/utils/index'

export default {
  name: 'TeacherList',
  data() {
    return {
      // 数据
      list: [],
      //
      total: 0,
      now: 1,
      limit: 10,
      teacherQuery: {},
      saveBtnDisabled: false
    }
  },
  mounted() {
    this.getList()
    // this.$nextTick(() => {
    //   this.tableData=this.list.
    //   console.log(this.tableData)
    // })

  },
  methods: {
    //显示数据
    getList(now = 1) {
      //动态改值
      this.now = now
      teacher.getTeacherList(this.now, this.limit, this.teacherQuery)
        //成功
        .then(
          response => {
            // console.log(response)
            this.list = response.data.teacher.records
            this.total = response.data.teacher.total
            // console.log(this.list)
          })
        //失败
        .catch(error => console.log(error))
    },
    //删除
    async handleDelete(s) {
      this.saveBtnDisabled = true
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacherById(s)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      })
      this.saveBtnDisabled = false
    },
    // 时间格式转化器
    getTime(s) {
      return getLocalTime(s)
    },
    // 清空
    resetData() {
      this.teacherQuery = {}
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
