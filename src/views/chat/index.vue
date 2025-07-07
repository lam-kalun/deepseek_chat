<script setup lang='ts'>
const title = ref<string>('')
</script>

<template>
  <div class="main-container">
    <title class="title">{{ title }}</title>

  </div>
</template>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    height: 46px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
  }
}
</style>