<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <!-- 后端接口添加了populate方法，把parent变成了一个对象，以此来获取它的name。否则prop=parent只能拿到它的id -->

      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- scope表示当前行 -->
          <el-button
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    //重新调用
    async fetch () {
      const res = await this.$http.get('/rest/admin_users')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`是否要删除管理员：${row.username}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //注意这边是row_id
        const res = await this.$http.delete(`/rest/admin_users/${row._id}`)
        this.items = res.data
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      });
    }
  },
  created () {
    this.fetch()
  },
}
</script>

<style lang="scss" scoped>
</style>