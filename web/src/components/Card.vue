// 简单封装卡片布局通用样式
<template>
  <div class="card p-3 bg-white mt-3 ai-center b-shadow">
      <div class="card-header d-flex pb-3"
      :class="{'b-bottom':!plain}"
      >
        <!-- 动态绑定 -->
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-grow-1 px-2">{{title}}</div>
        <!-- 如果没有声明plain属性就展示i -->
        <i class="iconfont icon-menu" v-if="!plain" ></i>
      </div>
      <div class="card-body pt-3">
        <slot>
          <!-- 预留的插槽，在外面调用的时候加了什么东西，就原封不动的显示在这边 -->

        </slot>
      </div>
    </div>
</template>

<script>
  export default {
    props:{
      title:{type:String,required:true},
      icon:{type:String,required:true},
      // 增强扩展性，在hero.vue中用到的都加plain这个属性，使样式扁平化，在这边接收这个参数
      plain:{type:Boolean}
    }
  }
</script>

<style lang="scss">
.card-header{
  border-bottom-color: white;
}

</style>