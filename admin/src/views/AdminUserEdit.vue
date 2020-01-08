
<template>
  <!-- 分类创建及编辑页 -->
  <div>
    <!-- 如果url带id参数，就显示编辑分类，不带就显示新建分类 -->
    <h1>{{id ? '编辑':'新建'}}管理员</h1>
    <!-- 点击保存按钮提交需要触发submit的原生事件，prevent表示阻止提交，不要跳转页面，定义一个save方法，写在methods中。在这边添加 -->
    <el-form @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    //在router的js文件中声明，这个页面可以跟路由尽可能的解耦
    //接收id这个参数
    id: {}
  },
  data () {
    return {
      model: {},
    }
  },
  methods: {
    //和后端的接口一样，用 async方式，把异步回调的方法换成同步，要用的话async和await成对使用
    //新建和编辑的save方法要做条件判断
    //新建：post接口  ；编辑：put接口
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/admin_users', this.model)
      }
      //eslint检查不能声明未引用的变量，所以加上这一句
      this.model = res.data

      // const res = await this.$http.post('admin_users',this.model)
      // this.$http.post('admin_users', this.model)
      this.$router.push('/admin_users/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    //根据id获取到当前记录详情，把名称填充到input中去
    async fetch () {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data
    },

  },
  created () {
    //前面这个条件满足之后（url带id参数，即当前处于编辑页面），再执行第二个条件
    this.id && this.fetch()
  },
}
</script>

<style lang="scss" scoped>
</style>