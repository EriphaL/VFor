
<template>
  <!-- 分类创建及编辑页 -->
  <div>
    <!-- 如果url带id参数，就显示编辑分类，不带就显示新建分类 -->
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <!-- 点击保存按钮提交需要触发submit的原生事件，prevent表示阻止提交，不要跳转页面，定义一个save方法，写在methods中。在这边添加 -->
    <el-form @submit.native.prevent="save">
      <!-- value值是默认显示那一页 -->
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <!-- 加一个multiple实现多选 -->
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <!-- 多级很可能会报错，所以要先在下面的data中定义一个空的，先至少保证它的存在 -->
            <el-rate :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <!-- 多级很可能会报错，所以要先在下面的data中定义一个空的，先至少保证它的存在 -->
            <el-rate :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <!-- 多级很可能会报错，所以要先在下面的data中定义一个空的，先至少保证它的存在 -->
            <el-rate :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <!-- 多级很可能会报错，所以要先在下面的data中定义一个空的，先至少保证它的存在 -->
            <el-rate :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="头像">
            <!-- :表示动态绑定
          action表示上传的接口地址是什么 ，加上upload拼成上传地址,defaults表示默认参数
            成功之后，在on-success中需要把返回来的图片的地址的值赋值给model.icon-->
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model,'avatar',res.url)"
            >
              <!-- 如果有图片地址显示图片 -->
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model,'banner',res.url)"
            >
              <!-- 如果有图片地址显示图片 -->
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <!-- 点击添加往里面新增一个空对象以供续写 -->
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <!-- 需要一个横向的排版 有技能名字和其对应的图标; flex-wrap:wrap表示换行-->
          <el-row type="flex" style="flex-wrap:wrap">
            <!-- i表示该循环的索引值 -->
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i" style="padding-right:20px;">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <!-- on-success成功的话显示赋值 -->
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <!-- 如果有图片地址显示图片 -->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input type="textarea" v-model="item.cd"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="textarea" v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="技能介绍">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 删除当前位置（索引index=i）的技能信息 -->
                <el-button type="danger" size="small" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button type="text" @click="model.partners.push({})">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>
          <!-- 需要一个横向的排版 有技能名字和其对应的图标; flex-wrap:wrap表示换行-->
          <el-row type="flex" style="flex-wrap:wrap">
            <!-- i表示该循环的索引值 -->
            <el-col
              :md="12"
              v-for="(item,i) in model.partners"
              :key="i"
              style="padding-right:20px;"
            >
              <!-- ,加一个过滤器可以按名称搜索 -->
              <el-form-item label="英雄名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 删除当前位置（索引index=i）的技能信息 -->
                <el-button type="danger" size="small" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem;">
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
      categories: [],
      items: [],
      heroes: [],
      model: {
        name: '',
        avatar: '',
        banner: '',
        scores: {
          difficult: 0
        },
        skills: [],
        partners: [],
      },
    }
  },
  methods: {
    // afterUpload (res) {
    //   //（前提：上面data中model:{}的情况下）显示赋值，三个参数，给this.model，赋一个属性'avatar',值为res.url
    //   // this.$set(this.model,'avatar',res.url)
    //   //只要在data里面初始化空值定义好了，就可以像下面这样用
    //   this.model.avatar = res.url
    // },
    //和后端的接口一样，用 async方式，把异步回调的方法换成同步，要用的话async和await成对使用
    //新建和编辑的save方法要做条件判断
    //新建：post接口  ；编辑：put接口
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/heroes', this.model)
      }
      //eslint检查不能声明未引用的变量，所以加上这一句
      void res

      // const res = await this.$http.post('categories',this.model)
      // this.$http.post('categories', this.model)
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    //根据id获取到当前记录详情，把名称填充到input中去
    async fetch () {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      //完整赋值，右边服务端的res会完整覆盖掉左边的东西，所以scores可能会没有
      // this.model = res.data
      //另一种赋值方法,三个参数，先赋空值，然后把this.model中的内容添加进去，再把res.data添加。
      //这样可以 如果model中有score，会先添加进去，res.data中要是没有score也不会影响。如果两个有重名，res.data中的值会覆盖this.model中的值
      this.model = Object.assign({}, this.model, res.data)
    },
    //根据id获取到当前记录详情，把名称填充到input中去
    async fetchCategories () {
      const res = await this.$http.get(`/rest/categories`)
      //当前的分类里面包含所有内容。但是事实只需要英雄一个分类。接下来要处理
      this.categories = res.data
    },
    //根据id获取到当前记录详情，把名称填充到input中去
    async fetchItems () {
      const res = await this.$http.get(`/rest/items`)
      //当前的分类里面包含所有内容。但是事实只需要英雄一个分类。接下来要处理
      this.items = Object.assign({}, this.items, res.data)
    },
    async fetchHeroes () {
      const res = await this.$http.get(`/rest/heroes`)
      //当前的分类里面包含所有内容。但是事实只需要英雄一个分类。接下来要处理
      this.heroes = Object.assign({}, this.heroes, res.data)
    },
  },
  created () {
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes()
    //前面这个条件满足之后（url带id参数，即当前处于编辑页面），再执行第二个条件
    this.id && this.fetch()
  },
}
</script>

<style>
</style>