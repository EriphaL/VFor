<template>
  <!-- 分类创建及编辑页 -->
  <div>
    <!-- 如果url带id参数，就显示编辑分类，不带就显示新建分类 -->
    <h1>{{id ? '编辑':'新建'}}广告位</h1>
    <!-- 点击保存按钮提交需要触发submit的原生事件，prevent表示阻止提交，不要跳转页面，定义一个save方法，写在methods中。在这边添加 -->
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <!-- 需要一个横向的排版 有技能名字和其对应的图标; flex-wrap:wrap表示换行-->
        <el-row type="flex" style="flex-wrap:wrap">
          <!-- i表示该循环的索引值 -->
          <el-col :md="24" v-for="(item,i) in model.items" :key="i" style="padding-right:20px;">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <!-- on-success成功的话显示赋值 -->
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item,'image',res.url)"
              >
                <!-- 如果有图片地址显示图片 -->
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <!-- 删除当前位置（索引index=i）的技能信息 -->
              <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        //需要加空数组，不然的话，新建广告位时点击添加会有报错
        items: []
      },

    }
  },
  methods: {
    //和后端的接口一样，用 async方式，把异步回调的方法换成同步，要用的话async和await成对使用
    //新建和编辑的save方法要做条件判断
    //新建：post接口  ；编辑：put接口
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/ads', this.model)
      }
      //eslint检查不能声明未引用的变量，所以加上这一句
      this.model = res.data

      // const res = await this.$http.post('ads',this.model)
      // this.$http.post('ads', this.model)
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    //根据id获取到当前记录详情，把名称填充到input中去
    async fetch () {
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
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