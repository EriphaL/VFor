<template>
  <!-- 对table绑定pagination操作 -->
  <el-row>
    <el-col :span="3" v-for="(item,index) in tableData" :key="index" :offset="1">
      <div style="margin-top:15px">
        <el-card :body-style="{ padding: '0px'}" shadow="hover">
          <img src="../assets/logo.png" class="image" />
          <div>
            <span v-html="format(item.name)"></span>
            <br />
            <div class="bottom clearfix">
              <time class="time">
                <strong>创建时间:</strong>
                <span v-html="format(item.date)"></span>
              </time>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    tableData: { type: Array, required: true },
    search: { type: String, required: true }
    // pageIndex: { type: Number, required: true }
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
