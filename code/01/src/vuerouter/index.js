let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 1、判断当前插件是否已经被安装
    // eslint-disable-next-line no-useless-return
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    // 2、把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3、把创建Vue实例传入的router对象注入到Vue实例上
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    const mode = this.options.mode
    this.createRouteMap()
    this.initComponents(_Vue, mode)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有路由规则，并解析成键值对的形式,存储到routerMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue, mode) {
    this['init' + mode + 'Components'](Vue)
  }

  inithistoryComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [
          this.$slots.default
        ])
      },
      methods: {
        clickHandler (e) {
          history.pushState([], '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current] ? self.routeMap[self.data.current] : self.routeMap['*']
        return h(component)
      }
    })
  }

  inithashComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: '#' + this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [
          this.$slots.default
        ])
      },
      methods: {
        clickHandler (e) {
          window.location.hash = '#' + this.to
          console.log(this.$router.data.current)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current] ? self.routeMap[self.data.current] : self.routeMap['*']
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash.slice(1)
    })
  }
}
