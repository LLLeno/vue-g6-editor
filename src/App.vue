<template>
  <div id="app">
    <Flow msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Flow from '@/pages/Flow.vue'

export default {
  name: 'app',
  components: {
    Flow
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0px;
}
</style>
