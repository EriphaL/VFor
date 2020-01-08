<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex">
      <img src="../assets/logo.png" height="30" />
      <!-- flex-1表示增大占据剩余所有空间 -->
      <div class="px-2 flex-1">
        <div class="text-white">SE</div>
        <div class="text-grey fs-xxs">团队成就</div>
      </div>
      <button type="button" class="btn bg-primary">download</button>
    </div>
    <div class="bg-primary pt-3 pb-2 shadow">
      <!-- 导航样式与大部分导航颜色相反，所以定义inverse -->
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item active">
          <!-- 表示一个链接 -->
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">其余中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: '首页',
  components: {

  }
}
</script>

<style lang="scss">
  .shadow{
    box-shadow: 0 1px 4px #000 inset;
  }

  // 表示吸顶的效果，兼容性可能较差
  .topbar{
    position:sticky;
    top:0;
    z-index: 999;
  }
</style>