<template>
  <!-- 对table绑定pagination操作 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px" v-html="format(scope.row.date)"></span>
      </template>
    </el-table-column>
    <el-table-column label="姓名">
      <template slot-scope="scope">
        <!-- 提示框 -->
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" v-html="format(scope.row.name)"></el-tag>
            <!-- <span size="medium" v-html="format(scope.row.name)"></span> -->
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: { type: Array, required: true },
    search: { type: String, required: true }
  },
  data() {
    return {};
  },
  methods: {
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
    }
  }
};
</script>