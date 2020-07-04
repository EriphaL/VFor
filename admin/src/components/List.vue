<template>
  <div class="mList">
    <el-input class="mInput" v-model="search" size="mini" placeholder="输入关键字搜索" />
    <my-table
      v-if="!this.switch"
      :tableData="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
      :search="search"
    ></my-table>
    <my-card
      v-else
      :tableData="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
      :search="search"
    ></my-card>
    <div class="mPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5 ,8 ,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>



<script>
// ---list
// ---------table
// ---------items
// ---------xxxx

// ---- echarts
// option: {type: sasa}
import moment from "moment";
export default {
  props: {
    switch: { type: Boolean, required: true }
  },
  name: "",
  components: {},
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      pageSize: 8, // 每页大小默认值
      pageIndex: 1, // 默认第一页
      search: "",
      tableData: Array(20).fill(item),
      // switch: false
    };
  },

  mounted() {},

  methods: {
    // 前端过滤
    format(val) {
      val = val.toString();
      if (val.indexOf(this.search) !== -1 && this.search !== "") {
        return val.replace(
          this.search,
          '<font color="red">' + this.search + "</font>"
        );
      } else {
        return val;
      }
    },
    dateFormat(val) {
      return moment(val).format("YYYY-MM-DD");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    handleToggleShow() {
      // 处理 toggle 状态的是否展开子菜单 handler
      this.toggleShow = !this.toggleShow;
    }
    // siteTableHeader() {
    //   return "sws-table-header";
    // },
    // tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex % 2) {
    //     return "warning-row";
    //   } else {
    //     return "success-row";
    //   }
    // },
    // handleEdit(rowIndex, row) {
    //   console.log(rowIndex);
    // }
  },
  computed: {
    // 搜索配置
    tables() {
      const search = this.search;
      if (search) {
        return this.tableData.filter(curSearch => {
          return Object.keys(curSearch).some(key => {
            return (
              String(curSearch[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    }, // 总条数
    total() {
      return this.tables.length;
    }
  },
  watch: {
    // 检测表格数据过滤变化，自动跳到第一页
    tables() {
      this.pageIndex = 1;
    }
  }
};
</script>
<style>
.el-table,
.mList {
  line-height: normal;
}
.mList > .el-input {
  padding: 1rem 0;
  margin-top: -20px;
  width: 50vw;
}
.el-table {
  border-radius: 6px;
}
.mPagination {
  padding-top: 5px;
  float: right;
}
</style>