class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement (node) {
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      let actionName
      if (this.isDirective(attrName)) {
        // v-text --> text
        if (attrName.indexOf(':') !== -1) {
          const actionArr = attrName.substr(2).split(':')
          attrName = actionArr[0]
          actionName = actionArr[1]
        } else {
          attrName = attrName.substr(2)
        }
        let key = attr.value
        this.update(node, key, attrName, actionName)
      } else if (this.isDirectiveAbbreviation(attrName)) {
        // @click --> click
        actionName = attrName.substr(1)
        attrName = 'on'
        let key = attr.value
        this.update(node, key, attrName, actionName, true)
      }
    })
  }

  update (node, key, attrName, actionName, isAbbreviation = false) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key, attrName, actionName, isAbbreviation)
  }

  // 处理 v-text 指令
  textUpdater (node, value, key, attrName) {
    node.textContent = value
    node.removeAttribute("v-" + attrName)
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  // v-model
  modelUpdater (node, value, key, attrName) {
    node.value = value
    node.removeAttribute("v-" + attrName)
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  // v-html
  htmlUpdater (node, value, key, attrName) {
    let html
    if (key.startsWith('\'') && key.endsWith('\'')) {
      html = key.replace(/\'/g, "")
    } else {
      html = value
    }
    node.innerHTML = html
    node.removeAttribute("v-" + attrName)
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }
  // v-on
  onUpdater (node, value, key, attrName, actionName, isAbbreviation) {
    node.addEventListener(actionName, value)
    if (isAbbreviation) {
      node.removeAttribute("@" + actionName)
    } else {
      node.removeAttribute("v-" + attrName + ':' + actionName)
    }
  }
  // 编译文本节点，处理差值表达式
  compileText (node) {
    // {{  msg }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象，当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断元素属性是否是指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }
  //判断元素属性是否是指令缩写
  isDirectiveAbbreviation (attrName) {
    return attrName.startsWith('@')
  }
  // 判断节点是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
}