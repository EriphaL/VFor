<template>
  <div class="mBread">
    <strong @click="back" class="mClick">首页&nbsp;</strong>
    <span class="subBread" v-for="(item, index) in showTitle" :key="index">/ {{item}}</span>
  </div>
</template>
<script>
export default {
  props: {
    breadName: { type: String, required: true }
  },
  data() {
    return {
      isClick: false,
      showTitle: []
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    async fetch() {
      const res = await this.$http.get("rest/categories");
      for (let el of res.data) {
        if (el["path"] == this.breadName) {
          this.showTitle.push(el.parent.name);
          this.showTitle.push(el.name);
          console.log(this.showTitle);
          break;
        }
      }
    }
  },
  created() {
    this.fetch();
    console.log(this.breadName);
    
  }
};
</script>
<style>
.mBread {
  line-height: normal;
  display: inline-flex;
  color: rgba(85, 83, 83, 0.8);
}
.mClick:hover {
  color: black;
  /* text-shadow:cadetblue 4px; */
}
.subBread {
  padding-left: 5px;
  /* color:rgba(85, 83, 83, 0.8) */
}
</style>