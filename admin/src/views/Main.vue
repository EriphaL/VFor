<template>
  <el-container>
    <el-header class="mHead">
      <div class="mLogo">
        <img src="../assets/logo.png" alt />
      </div>
      <div style="flex:auto"></div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px;font-size:1.5rem"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-user" style="font-size:2rem"></i>
    </el-header>
    <el-container>
      <!-- 导航改成vw 查询viewport 移动端隐藏 :default-openeds="['1']" -->
      <el-aside width="200px">
        <el-menu router unique-opened :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-edit"></i>内容管理
            </template>
            <el-menu-item-group>
              <template slot="title">管理</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">内容列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <Sidebar :menuList="list"></Sidebar>
      </el-aside>
      <el-container>
        <el-main>
          <my-bread-crumb class="mBreadCrumb" :breadName="$route.path"></my-bread-crumb>
          <router-view :key="$route.path"></router-view>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>


<script>
import Sidebar from "../components/Sidebar";
export default {
  components: { Sidebar },
  data() {
    return {
      list: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/categories");
      const cur = JSON.parse(JSON.stringify(res.data))

      function setParent(data) {
        for(let i =0;i<data.length;i++){
          if(data[i]['parent']){
            data[i]['parent'] = data[i]['parent']['_id']
          }
        }
        return data
      }
      function format(jsonData) {
        setParent(jsonData)
        let result = [],
          temp = {},
          i = 0,
          j = 0,
          len = jsonData.length;
        for (; i < len; i++) {
          temp[jsonData[i]["_id"]] = jsonData[i]; // 以id作为索引存储元素，可以无需遍历直接定位元素
        }
        for (; j < len; j++) {
          var currentElement = jsonData[j];
          var tempCurrentElementParent = temp[currentElement["parent"]]; // 临时变量里面的当前元素的父元素 parentId 父级ID
          if (tempCurrentElementParent) {
            // 如果存在父元素
            if (!tempCurrentElementParent["children"]) {
              // 如果父元素没有chindren键
              tempCurrentElementParent["children"] = []; // 设上父元素的children键
            }
            tempCurrentElementParent["children"].push(currentElement); // 给父元素加上当前元素作为子元素
          } else {
            // 不存在父元素，意味着当前元素是一级元素
            result.push(currentElement);
          }
        }
        return result;
      }
      console.log(res.data);

      // console.log(format(setParent(cur)));
      this.list = format(cur);
      console.log(this.list);
      
      // this.list = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style >
.el-container {
  height: 92vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  /* line-height: 60px; */
}

.el-aside {
  height: fit-content;
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  line-height: normal;
  /* text-align: center; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.mHead {
  display: flex;
  align-items: center;
}
img {
  height: 2.5rem;
}

.mNav {
  display: flex;
}
.mBreadCrumb {
  flex: auto;
  padding-bottom: 20px;
}
</style>