import BaseFlow from './src/BaseFlow.vue' // 导入组件

// const VueG6Editor = {
//   install(Vue) {
//     Vue.component(BaseFlow.name, BaseFlow) // Flow.name 组件的name属性
//   }
// }

BaseFlow.install = function (Vue) {
  Vue.component(BaseFlow.name, BaseFlow)
}

export default BaseFlow // 导出..
