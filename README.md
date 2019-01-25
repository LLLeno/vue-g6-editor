# vue-g6-editor

一个基于vue & antv/g6-editor封装的基础流程图插件

## install
```
npm install --save vue-g6-editor 
```

## use
```
import BaseFlow from 'vue-g6-editor'
import 'vue-g6-editor/lib/BaseFlow.css'

<BaseFlow :data=data :getData=getData />

properties:
  data: 传入数据，数据格式参考：https://www.yuque.com/antv/g6-editor/flow-api#tg9kpf
        或者参考example/model文件夹下的flow.json

methods:
  getData: 获取数据接口，传入callback，如：
  getData(data) {
    console.log(data)
    ...
  }
```

# online preview

http://www.coderlyc.xyz/vue-g6-editor/
