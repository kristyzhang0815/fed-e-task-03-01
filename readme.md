# 一、简答题
## 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。
```
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
 
```
答： 不是  ，Vue 不允许动态添加根级别的响应式 property,必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值，其他情况需要通过特殊的方法设置 
```
对象使用的方法:
 Vue.set(object, propertyName, value)  
 或
 Vue.set(vm.someObject, 'b', 2)

 为已有对象赋值多个新property:  
 this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })  

 数组使用的方法：  
Vue.set(vm.items, indexOfItem, newValue)  
vm.items.splice(indexOfItem, 1, newValue)  
或者  
vm.$set(vm.items, indexOfItem, newValue)  
vm.items.splice(newLength)

```

内部的原理：  
如果目标是数组，vue内部利用数组的splice变异方法触发响应式  
如果目标是对象，判断属性是否存在target上，或者target的prototype上，如果是则直接赋值，   
如果以上都不成立，则获取target的Observer实例，如果获取不到，则先直接赋值
如果属性不是响应式的，,则调用 defineReactive 方法进行响应式处理


## 2、请简述 Diff 算法的执行过程
 
 答：
 ```
 在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历的工程中移动索引

在对开始和结束节点比较的时候，总共有四种情况

oldStartVnode/newStartVnode(旧开始节点/新开始节点)
oldEndVnode/newEndVnode(旧结束节点/新结束节点)
以上两种情况类似：

如果oldStartVnode和newStartVnode是sameVnode(key和sel相同)

调用patchVnode()对比和更新节点

把旧开始和新开始索引往后移动oldStartIdx++/oldEndIdx++

oldStartVnode/oldEndVnode(旧开始节点/新结束节点)
如果oldStartVnode/oldEndVnode相同

调用patchVnode()对比和更新节点
把oldStartVnode对应的DOM元素，移动到右边
更新索引
oldEndVnode/newStartVnode(旧结束节点/新开始节点)
如果oldEndVnode/newStartVnode相同

调用patchVnode()对比和更新节点
把oldEndVnode对应的DOM元素，移动到左边
更新索引
如果以上四种情况都不满足

遍历新节点，使用newStartNode的key在老节点数组中找相同节点
如果没有找到，说明newStartNode是新节点，则创建新节点对应的DOM元素，插入到DOM树中
如果找到了
判断新节点和找到的老节点的sel选择器是否相同
如果不相同，说明节点被修改了，则重新创建对应的DOM元素，插入到DOM树中
如果相同，则吧elmToMove对应的DOM元素移动到左边
循环结束

当来节点的所有子节点先遍历完，循环结束，老节点的数组先遍历完，说明新节点有剩余，把剩余节点批量插入到右边。
新节点的所有子节点先遍历完，循环结束，新节点的数组先遍历完，说明老节点有剩余，把剩余节点批量删除
```

# 二、编程题
## 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
 
/code/01

## 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

 /code/02

## 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

/code/03