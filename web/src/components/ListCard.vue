<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-btw">
      <!-- newsData的数据取过来，在这边已经叫categories了 -->
      <!-- 第二个active表示的是下面data的变量名 -->
      <!-- 这边点击事件绑定的是点击活动swiper-slide切换到活动页面 -->
      <div class="nav-item" :class="{active:active === i}"
      v-for="(category,i) in categories" :key="i"
      @click="$refs.list.swiper.slideTo(i)">
      <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <!-- 表示把组件中真实的索引值赋值给active 完成滑动的交互-->
      <swiper ref="list" :options="{autoHeight:true}" @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide  v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  // 参数定义
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      // 表示默认高亮的索引值是0，即第一个
      active:0,
    }
  },


}
</script>

<style lang="scss" scoped>
</style>