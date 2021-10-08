#  1.VUE3新特性：suspense

在正确渲染组件之前进行一些异步请求是很常见的事。组件通常会在本地处理这种逻辑，绝大多数情况下这是非常完美的做法。该 `<suspense>` 组件提供了另一个方案，允许将等待过程提升到组件树中处理，而不是在单个组件中。

```
<template>
  <suspense>
    <template #default>
      <todo-list />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>

//----------------------React中类似------------
 <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
         	<Router>
        </Switch>
  </Suspense>
```

`<suspense>` 组件有两个插槽。它们都只接收一个直接子节点。`default` 插槽里的节点会尽可能展示出来。如果不能，则展示 `fallback` 插槽里的节点。

重要的是，异步组件不需要作为 `<suspense>` 的直接子节点。它可以出现在组件树任意深度的位置，且不需要出现在和 `<suspense>` 自身相同的模板中。只有所有的后代组件都准备就绪，该内容才会被认为解析完毕。

另一个触发 `fallback` 的方式是让后代组件从 `setup` 函数中返回一个 Promise。通常这是通过 `async` 实现的，而不是显式地返回一个 Promise：

## 1.子组件更新

一旦 `<suspense>` 的 `default` 插槽里的内容被解析，则它只有在 `default` 根结点被替换的时候才能被再次触发。而树里的深层嵌套组件不足以让 `<suspense>` 回到等待状态。

如果根结点发生了变化，它会触发 `pending` 事件。然而，默认情况下，它不会更新 DOM 以展示 `fallback` 内容。取而代之的是，它会继续展示旧的 DOM，直到新组件准备就绪。这个行为可以通过 `timeout` prop 进行控制。这个值是一个毫秒数，告诉 `<suspense>` 组件多久之后展示 `fallback`。如果这个值是 `0` 则表示它在 `<suspense>` 进入等待状态时会立即显示。

## 2.事件

除了 `pending` 事件以外，`<suspense>` 组件还拥有 `resolve` 和 `fallback` 事件。`resolve` 事件会在 `default` 插槽完成新内容的解析之后被触发。`fallback` 事件会在 `fallback` 插槽的内容展示的时候被触发。

这些事件可以用在诸如当新组件加载时在旧 DOM 上展示一个加载标识等场景。

## 3.和其它组件结合

将 `<suspense>` 跟  <transition> 和 <keep-alive>  组件相结合是常见的情形。这些组件的嵌套顺序对于它们的正确工作很重要。

额外的，这些组件经常用于衔接 的`<router-view>` 组件。

示例
```
<router-view v-slot="{ Component }">
  <template v-if="Component">
    <transition mode="out-in">
      <keep-alive>
        <suspense>
          <component :is="Component"></component>
          <template #fallback>
            <div>
              Loading...
            </div>
          </template>
        </suspense>
      </keep-alive>
    </transition>
  </template>
</router-view>
```

Vue Router 有内置的基于动态导入的[组件懒加载](https://next.router.vuejs.org/zh/guide/advanced/lazy-loading.html)支持。它和异步组件有所区别，并且当前不会触发 `<suspense>`。不过它们仍然可以包含异步组件作为后代，这样它们还是可以正常触发 `<suspense>`。



#2.keep-alive
将失活的组件将会被缓存，如下，一个多标签的界面中使用 is attribute 来切换不同的组件

```
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```



#  2.插槽(具名插槽，作用域插槽)
## 1.插槽
父：
<child>
  data
</child>

子<child>:
<a>
  <slot></slot>
</a>

## 2.具名插槽
在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

父组件<parent>中:
```
<child>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</child>
```

子组件<child>中:
```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

## 3.作用域插槽

![vue插槽](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\vue插槽.png)

#  3.nextTick
    1.语法: this.$nextTick(回调函数)
    2.作用:在下一次DOM更新结束后执行其指定的回调。
    3.什么时候用:当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
vue3的写法
```
import { nextTick } from 'vue'
nextTick(() => {
  // 一些和 DOM 有关的东西
})
```

```
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)
  // 执行一些 DOM 相关的任务
  await nextTick()
  // 运行你的断言
})
```

# 4.Vue3.0中的响应式原理
vue2.x的响应式
·实现原理:
·对象类型:通过 object.defineProperty()对属性的读取、修改进行拦截(数据劫持)。
·数组类型:通过重写更新数组的一系列方法来实现拦截。(对数组的变更方法进行了包裹)。
```
//Object.defineProperty(obj, prop, descriptor)
//·obj-要定义属性的对象。 
  ·prop-要定义或修改的属性的名称或 Symbol。  
  ·descriptor-要定义或修改的属性描述符:
          ·value：属性的值(不用多说了)
          ·writable：如果为false，属性的值就不能被重写,只能为只读了
          ·configurable：是否可以配置，一旦为false，就不能设置(value，writable)
          ·enumerable：是否枚举，是否能在for...in循环中遍历出来或在Object.keys中列举出
          ·get：获取
          ·set：设置

 Object.defineProperty(target, key, {
    get() {
        return target[key];
    },
    set(newval) {
        target[key] = newval
    }
})
            
```
·存在问题:
·新增属性、删除属性,界面不会更新。
·直接通过下标修改数组,界面不会自动更新。

vue3.0的响应式
·实现原理:
·通过Proxy (代理)︰拦截对象中任意属性的变化,包括:属性值的读写、属性的添加、属性的删除等。
·通过Reflect(反射)︰对被代理对象的属性进行操作。
·MDN文档中描述的Proxy与Reflect:
```
   const p = new Proxy(obj, {
       get(target,propName) {
               return target[propName];
           },
       set(target,propName,newval) {
              target[propName] = newval
           }
   })
```

## vue2完整响应式原理
 在Vue中，每个组件实例都有相应的watcher实例对象，它会在组件渲染的过程中把属性记录为依赖，
之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。
这是一个典型的观察者模式。
关键角色
在 Vue 数据双向绑定的实现逻辑里，有这样三个关键角色：
1.Observer: 它的作用是给对象的属性添加getter和setter，用于依赖收集和派发更新

2.Dep: 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个Dep实例（里面subs是Watcher实例数组）,当数据有变更时,会通过dep.notify()通知各个watcher。

3.Watcher: 观察者对象 , 实例分为渲染 watcher (render watcher),计算属性 watcher (computed watcher),侦听器 watcher（user watcher）三种

Watcher 和 Dep 的关系
为什么要单独拎出来一小节专门来说这个问题呢？因为大部分同学只是知道：Vue的响应式原理是通过Object.defineProperty实现的。被Object.defineProperty绑定过的对象，会变成「响应式」化。也就是改变这个对象的时候会触发get和set事件。

![vue2响应式](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\vue2响应式.png)
如上图所示：一个属性可能有多个依赖，每个响应式数据都有一个Dep来管理它的依赖。
一段话总结原理
上面说了那么多，下面我总结一下Vue响应式的核心设计思路：
当创建Vue实例时,vue会遍历data选项的属性,利用Object.defineProperty为属性添加getter和setter对数据的读取进行劫持（getter用来依赖收集,setter用来派发更新）,并且在内部追踪依赖,在属性被访问和修改时通知变化。
每个组件实例会有相应的watcher实例,会在组件渲染的过程中记录依赖的所有数据属性（进行依赖收集,还有computed watcher,user watcher实例）,之后依赖项被改动时,setter方法会通知依赖与此data的watcher实例重新计算（派发更新）,从而使它关联的组件重新渲染。
到这里，我们已经了解了“套路”，下面让我们用伪代码来实现一下Vue的响应式吧！
核心实现
```
/**
 * @name Vue数据双向绑定（响应式系统）的实现原理
 */

// observe方法遍历并包装对象属性
function observe(target) {
  // 若target是一个对象，则遍历它
  if (target && typeof target === "Object") {
    Object.keys(target).forEach((key) => {
      // defineReactive方法会给目标属性装上“监听器”
      defineReactive(target, key, target[key]);
    });
  }
}
// 定义defineReactive方法
function defineReactive(target, key, val) {
  const dep = new Dep();
  // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
  observe(val);
  // 为当前属性安装监听器
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function () {
      return val;
    },
    // 监听器函数
    set: function (value) {
      dep.notify();
    },
  });
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
```
