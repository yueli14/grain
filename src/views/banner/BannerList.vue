<template>
  <div>
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
        label="标题"
        width="100"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag color="translate" size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="链接地址"
        width="200"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>简介: {{ scope.row.linkUrl }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="small">{{ scope.row.linkUrl }}</el-tag>
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
          <span style="margin-left: 5px">{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--         region路由跳转-->
          <router-link :to="`/banner/edit/`+scope.row.id">
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
import banner from '@/api/banner'
import { getLocalTime } from '@/utils'
import teacher from '@/api/teacher'

export default {
  name: 'BannerList',
  data() {
    return {
      // 数据
      list: [],
      //
      total: 0,
      now: 1,
      limit: 10,
      saveBtnDisabled: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList(now = 1) {
      this.now = now
      let r = await banner.getBannerList(this.now, this.limit)
      if (r.code === 20000) {
        this.list = r.data.page.records
      } else {
        this.$message.warning('数据拉取失败，请稍后再试')
      }
    },
    //删除
    async handleDelete(s) {
      this.saveBtnDisabled = true
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        banner.deleteBannerById(s)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      })
      this.saveBtnDisabled = false
    }
  }
}
</script>

<style scoped>

</style>
