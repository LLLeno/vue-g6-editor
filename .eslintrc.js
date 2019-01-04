module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 在这里自定义修改
    'linebreak-style': 0,
    semi: [2, 'never'], // 不加分号
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }], // 允许三元
    'no-plusplus': 0, // 开启i++
    'comma-dangle': [2, 'never'], // 结尾不使用逗号
    'import/no-unresolved': [2, { ignore: ['esri', 'dojo'] }], // 解决import esri/xxx编译不通过
    'import/extensions': 0,
    // 'no-console': 0,
    'arrow-parens': [2, 'as-needed'], // 箭头函数参数只有一个时无需加括号
    'no-param-reassign': [2, { props: false }],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
