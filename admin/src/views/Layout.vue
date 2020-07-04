<template>
  <div>
    <div class="mNav">
      <el-switch v-model="isCard" active-text="卡片" inactive-text="表单" class="mSwitch"></el-switch>
    </div>
    <my-list :switch="isCard"></my-list>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      isCard: false,
    };
  },
  methods: {
  }
};
</script>
<style scoped>
.mNav{
    float: right;
    padding-right: 2rem;
}
</style>