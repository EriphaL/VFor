<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        >
      <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" />
    </el-menu>
  </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from './SidebarItem'
export default {
  name:'Sidebar',
  components: { SidebarItem },
  props:{
    menuList: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
 
</style>