<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from "@/api/subject"

export default {
  name: "SubjectList",

  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      val.toLowerCase()
      this.$refs.tree.filter(val.toLowerCase())
    }
  },
  mounted() {
    this.getAllSubject()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value) !== -1
    },
    async getAllSubject() {
      var r = await subject.getAllSubject()
      // console.log(r)
      if (r.code === 20000) {
        this.data=r.data.list
      }else {
        this.message.error("加载失败，请重试")
      }
    }
  }

}
</script>

<style scoped>

</style>
