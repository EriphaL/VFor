<template>
  <!-- 要加vif，model存在的时候，执行 -->
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2">
      <div class="iconfont icon-back pr-2"></div>
      <strong class="flex-1">{{model.title}}</strong>
      <div class="text-grey fs-xs">2019-06-01</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex">
        <i class="iconfont icon-Menu"></i>
        <strong class="fs-lg  ml-1">相关资讯</strong>
      </div>
    </div>
    <div class="px-3">
      <router-link 
      class="px-1 py-2"
      tag="div"
      :to="`/articles/${item._id}`"
      v-for = "item in model.related"
      :key="item._id"
      >
      {{item.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data () {
    return {
      model: null
    }
  },
  // 点击相关资讯跳转，需要监听id，重新执行fetch,2种方法
  watch: {
    id:'fetch',
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.fetch()
  },
}
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    // 视频
    iframe{
      width:100%;
      height: auto;
    }
  }
}
</style>