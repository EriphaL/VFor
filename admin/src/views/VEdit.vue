
<template>
  <!-- 分类创建及编辑页 -->
  <div>
    <!-- 如果url带id参数，就显示编辑分类，不带就显示新建分类 -->
    <h1>{{id ? '编辑':'新建'}}Vcard</h1>
    <!-- 点击保存按钮提交需要触发submit的原生事件，prevent表示阻止提交，不要跳转页面，定义一个save方法，写在methods中。在这边添加 -->
    <el-form @submit.native.prevent="save">
      <el-form-item label="所属人物">
        <el-select v-model="model.character" @change="getSelect">
          <!-- lable决定选项显示什么内容，value决定点击它时真正存的是什么内容 -->
          <el-option
            v-for="item in character"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景">
        <el-input v-model="model.scene" style="padding-left:5rem;"></el-input>
      </el-form-item>
      <el-form-item label="引用自">
        <el-input  v-model="model.from" style="padding-left:5rem;"></el-input>
      </el-form-item>
      <el-form-item label="英文台词">
        <el-input type="textarea" v-model="model.partEn" style="padding-left:5rem;"></el-input>
      </el-form-item>
      <el-form-item label="中文译文">
        <el-input type="textarea" v-model="model.partZh" style="padding-left:5rem;"></el-input>
      </el-form-item>
      <!-- <el-form-item label="文章内容">
        <div>
          <vue-editor v-model="model.body"></vue-editor>
        </div>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 解构的赋值方法
// import { VueEditor } from "vue2-editor";

export default {
  props: {
    //在router的js文件中声明，这个页面可以跟路由尽可能的解耦
    //接收id这个参数
    id: {}
  },
  // components: {
  //   VueEditor
  // },
  data () {
    return {
      // 默认选中，还需要初始化character数组
      model: {
        character:'5def5bc78394711e44755312'
      },
      character: [],
    }
  },
  methods: {
    //和后端的接口一样，用 async方式，把异步回调的方法换成同步，要用的话async和await成对使用
    //新建和编辑的save方法要做条件判断
    //新建：post接口  ；编辑：put接口
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/vcards/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/vcards', this.model)
      }
      //eslint检查不能声明未引用的变量，所以加上这一句
      this.model = res.data

      // const res = await this.$http.post('categories',this.model)
      // this.$http.post('categories', this.model)
      this.$router.push('/vcards/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    //根据id获取到当前记录详情，把名称填充到input中去
    async fetch () {
      const res = await this.$http.get(`/rest/vcards/${this.id}`)
      this.model = res.data
    },
    //获取下拉列表中的上级分类
    async fetchCharacter () {
      const res = await this.$http.get(`/rest/heroes`)
      this.character = Object.assign({}, this.character, res.data)
    }
  },
  created () {
    this.fetchCharacter()
    //前面这个条件满足之后（url带id参数，即当前处于编辑页面），再执行第二个条件
    this.id && this.fetch()
  },
  // async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
  //   // An example of using FormData
  //   // NOTE: Your key could be different such as:
  //   // formData.append('file', file)
  //   //html里面自带的一个类，提交表单数据就可以用formdata。可以有表单数据和json数据
  //   const formData = new FormData();
  //   //注意名字是file（第一个），因为server端中upload.single('file')接收的是file，“file”要保持一致
  //   formData.append("file", file);
  //   //res就是下面的result
  //   const res = await this.$http.post("upload", formData);
  //   //  上面一句话就可以取代
  //   //  axios({
  //   //   url: "https://fakeapi.yoursite.com/images",
  //   //   method: "POST",
  //   //   data: formData
  //   // })
  //   //cursorLocation光标位置，插入一个参数，参数的位置
  //   Editor.insertEmbed(cursorLocation, "image", res.data.url);
  //   //重置上传器
  //   resetUploader();
  // }
}

</script>

<style lang="scss" scoped>
</style>