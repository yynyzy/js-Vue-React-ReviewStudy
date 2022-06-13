# 0.简述MVVM
MVVM是Model-View-ViewModel的缩写。Model 代表数据层，可定义修改数据、编写业务逻辑。View 代表视图层，负责将数据渲染成页面。ViewModel 负责监听数据层数据变化，控制视图层行为交互，简单讲，就是同步数据层和视图层的对象。*ViewModel 通过双向绑定把 View 和 Model 层连接起来，且同步工作无需人为干涉，使开发人员只关注业务逻辑，无需频繁操作DOM*，不需关注数据状态的同步问题。
# 0.5 mvc，mvp，mvvm是什么
 *mvc*
模型（Model）：数据保存
视图（View）：用户界面。
控制器（Controller）：业务逻辑

![img](https://user-gold-cdn.xitu.io/2019/12/10/16eeea374464210e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

View 传送指令到 Controller
Controller 完成业务逻辑后，要求 Model 改变状态
Model 将新的数据发送到 View，用户得到反馈

 *mvp*
1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。


![img](https://user-gold-cdn.xitu.io/2019/12/10/16eeea3971e41642?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

*mvvm*

View的变动，自动反映在 ViewModel，反之亦然。

![img](https://user-gold-cdn.xitu.io/2019/12/10/16eeed0206ee71a2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


# 1.VUE3新特性：Suspense 与 Teleport
### Suspense
在正确渲染组件之前进行一些异步请求是很常见的事。组件通常会在本地处理这种逻辑，绝大多数情况下这是非常完美的做法。该 `<suspense>` 组件提供了另一个方案，允许将等待过程提升到组件树中处理，而不是在单个组件中。

*!!!* 真实的项目中踩过坑，若想在 setup 中调用异步请求，需在 setup 前加async关键字。这时，会受到警告async setup() is used without a suspense boundary。
解决方案：在父页面调用当前组件外包裹一层Suspense组件。
```html
<template>
  <Suspense>
    <template #default>
      <todo-list />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </Suspense>
</template>
```
```js
  //----------------------React中类似------------
 <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
         	<Router>
        </Switch>
  </Suspense>
```



### Teleport
Vue3 提供Teleport组件可将部分DOM移动到 Vue app之外的位置。比如项目中常见的Dialog组件。
```js
<button @click=dialogVisible = true>点击</button>
<teleport to=body>
   <div class=dialog v-if=dialogVisible>
   </div>
</teleport>
```


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
```js
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



# 2.**插槽**(具名插槽，作用域插槽)

  ## 具名插槽
在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

父组件<parent>中:
```js
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
```js
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

  ## 作用域插槽
子组件在作用域上绑定的属性来将组件的信息传给父组件，这些属性会被挂载到父组件接受对象上
![vue插槽](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\vue插槽.png)
```js
//子组件
<template>
  <slot name="footer" childProps="子组件">
  作用域插槽内容
  </slot>
</template>

//父组件
<template>
  <child v-slot:footer="slotProps">
      {{slotProps.childProps}}
  </child>
</template>
```

# 3.**nextTick**
    1.语法: this.$nextTick(回调函数)
    2.作用:在下一次DOM更新结束后执行其指定的回调。
    3.什么时候用:当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
vue3的写法
```js
import { nextTick } from 'vue'
nextTick(() => {
  // 一些和 DOM 有关的东西
})
```

```js
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

# 4.**Vue中的响应式原理**
  ## 1.vue2.x的响应式
·实现原理:
·对象类型:通过 object.defineProperty()对属性的读取、修改进行拦截(数据劫持)。
·数组类型:通过重写更新数组的一系列方法来实现拦截。(对数组的变更方法进行了包裹)。
```js
//Object.defineProperty(obj, prop, descriptor)
  ·obj-要定义属性的对象。 
  ·prop-要定义或修改的属性的名称或 Symbol。  
  ·descriptor-要定义或修改的属性描述符:
          ·value：属性的值(不用多说了)
          ·writable：如果为false，属性的值就不能被重写,只能为只读了
          ·configurable：是否可以配置，一旦为false，就不能设置(value，writable)
          ·enumerable：是否枚举，是否能在for...in循环中遍历出来或在Object.keys中列举出
          ·get：获取
          ·set：设置

 const p = Reflect.defineProperty(target, key, {
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

  ## 2.vue3.0的响应式
·实现原理:
·通过Proxy (代理)︰拦截对象中任意属性的变化,包括:属性值的读写、属性的添加、属性的删除等。
·通过Reflect(反射)︰对被代理对象的属性进行操作。
·MDN文档中描述的Proxy与Reflect:
```js
   const p = new Proxy(obj, {
     //target就是obj key就是要取obj里面的哪个属性
       get(target,key) {
               return Reflect.get(target,key);
           },
       set(target,key,newval) {
         return Reflect.set(target,key, newval);
           }
   })
```

  ## 3.面试回答 Vue2完整响应式原理
1.有这样三个关键角色：(Observer,Watcher,Dep)
  *·Observer*: 
    1.在数据初始化时，vue会将 data选项转换成 Observer 对象。
    2.Observer 会遍历对象的属性。多层对象是通过递归来实现。数组类型，通过重写数组方法来实现。
    3.通过调用 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持。
    
  *·Watcher*: 观察者对象 ,执⾏更新函数（更新dom）
  实例分为渲染 watcher (render watcher),计算属性 watcher (computed  watcher),侦听器 watcher（user watcher）三种

  *·Dep*: 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个Dep实例, 当数据有变更时,setter 里面会触发 dep.notify() 通知各个watcher去改动。

![vue2响应式](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\vue2响应式.png)


  ## **4.核心实现**
  /**
 * @name Vue数据双向绑定（响应式系统）的实现原理
 */
```js
        function observer(target) {
            if (typeof target !== 'object') {
                return target
            }
            Object.keys(target).forEach((k) => {
                defineReactive(target, key, target[k])
            })
        }

        function defineReactive (obj, key, val) {
            // 递归响应，处理嵌套对象
            observer(val)

            // 创建Dep实例： Dep和key一对一对应
            const dep = new Dep()

            Object.defineProperty(obj, key, {
                get: function (obj, key) {
                if (Dep.target) {
                    dep.depend()
                }
                return obj[key]
              },
               set: function (obj, key, newval) {
                if (val != newval) {
                    val = newval
                    observe(newval)
                    dep.notify()
                }
            }
          })
        }

        // Dep: 管理若干watcher实例，它和key一对一关系
     class Dep {
        static target;
        constructor() {
            this.subs = []
        }
        depend() {
            if (Dep.target) {
              // Dep.target 是 watcher实例，调用wtacher实例的 addDep 方法，将当前的Dep实例传过去
                Dep.target.addDep(this)
            }
        }
         // 为当前收集器添加 Watcher实例
        addSub(watcher) {
          this.subs.push(watcher);
        }
        notify() {
             this.subs.forEach((sub) => {
                    sub.update()
                })
        }
    }

      // 实现update函数可以更新, 
      class Watcher {
          constructor(vm,_) {
              // 将当前实例指向Dep.target
              this.get()
          }
          get(){
            // 将当前Dep.target指向自己
              Dep.target = this;
          }
          // 运用传过来的 dep的addsub方法将当前 wathcer实例传到dep的subs数组中
          addDep(dep){
              dep.addSub(this);
          }
          // 更新方法，用于触发vm._render
          update() {
              console.log(`${this.key}属性更新了`)
          }
      }     
```
在 getter 方法里， 有一个 Dep.target 参数， 这个 target 其实就是 watch 实例， 那么 target 从哪里来的呢。
在 beforeMount钩子 和 mounted 钩子初始化之间，会实例化 Watch 类, Watch 构造函数中会把 watch 实例保存在 Dep.target 上， 随后会触发所有数据的访问，也就是上面的 getter 方法，dep.depend() 会把 watch 保存起来， 这个过程就是收集依赖。
 

# 5.watchEffect 和 watch 的区别
  ## 1.watch侦听器
  对基本数据类型进行监听----- watch特性：
  1.具有一定的惰性lazy 第一次页面展示的时候不会执行，只有数据变化的时候才会执行 
  2.参数可以拿到当前值和原始值 
  3.可以侦听多个数据的变化，用一个侦听器承载
  4.如果监听rective对象中的属性,必须通过函数来指定,如果监听多个数据,需要使用数组来指定。

```js
watch :{
  prop:{
    (newValue, oldValue) => {
      console.log(newValue, oldValue);
  }
  },
    immediate:true, //默认初始时不执行回调，通过配置immediate未true，来指定初始时立即执行
    deep:true       //通过配置deep为true，来指定深度监听。
```

侦听器还可以使用数组以同时侦听多个源：
```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
}
```

  ## 2.watchEffect
  1.立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
  2.立即执行，没有惰性，页面的*首次加载就会执行*。
  3.不需要传递要侦听的内容,只要传递一个回调函数
  4.*不能获取之前数据的值* 只能获取当前值
  5.一些异步的操作放在这里会更加合适
```js
const count = ref(0)
watchEffect( () => {
  console.log(count.value)
  },
  {
   flush:'post' //添加flush:'post'会在onBeforeUpdate之后执行 没有会在之前
  }
})

```

## 3.watch和watchEffect停止监听
1.watch 与 watchEffect 在手动停止侦听、清除副作用 (将 onInvalidate 作为第三个参数传递给回调)、刷新时机和调试方面有相同的行为。
2.将watch/watchEffect 赋值给一个变量，调用这个变量，函数执行就会停止监听，一般在组件销毁时执行。
```
var stop =  watchEffect(async (onInvalidate)=>{
       var a = states.value
       console.log('watchEffect')
       onInvalidate(()=>{ //没有stop先执行回调 在执行副作用
           console.log("onInvalidate") //有stop 执行会停在这里 副作用不在执行
       })
})

setTimeout(()=>{
  stop()
},2000)

```

# 6.reactive对比ref
·从定义数据角度对比:
    ·ref用来定义:       基本类型数据
    ·reactive用来定义:  对象(或数组)类型数据
    ·备注: ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转为代理对象。
·从原理角度对比:
    ·ref通过 Object.defineProperty() 的get与set来实现响应式(数据劫持)。
    ·reactive通过使用 Proxy 来实现响应式(数据劫持)﹐并通过Reflect操作源对象内部的数据。
·从使用角度对比:
    ·ref定义的数据:操作数据需要.value，读取数据时模板中直接读取不需要.value
    ·reactive定义的数据:操作数据与读取数据:均不需要.value 

# 7.Vue 动态组件是什么? is
```js
Props：
  is - string | Component
```
用法：
渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。is 的值是一个字符串，它既可以是 HTML 标签名称也可以是组件名称。
```js
<!--  动态组件由 vm 实例的 `componentId` property 控制 -->
<component :is="componentId"></component>

<!-- 也能够渲染注册过的组件或 prop 传入的组件-->
<component :is="$options.components.child"></component>

<!-- 可以通过字符串引用组件 -->
<component :is="condition ? 'FooComponent' : 'BarComponent'"></component>

<!-- 可以用来渲染原生 HTML 元素 -->
<component :is="href ? 'a' : 'span'"></component>
```

```html
<template>
  <div v-for="val in componentsData" :key="val.id">
    <component :is="val.type">
  </div>
</template>
<script>
import CustomTitle from './CustomTitle'
import CustomText from './CustomText'
import CustomImage from './CustomImage'

export default {
  data() {
    return {
      componentsData: [{
        id: 1,
        type: 'CustomTitle'
      },{
        id: 2,
        type: 'CustomText'
      },{
        id: 3
        type: 'CustomImage'
      }]
    }
  }
}
</script>
```


# 8.setup的两个注意点
.setup执行的时机
    在beforeCreate之前执行一次，this是undefined。
.setup的参数(props,context):

  1.props:值为对象，包含:组件外部传递过来，且组件内部声明接收了的属性。
    setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。
```js
    export default {
      props: {
        title: String
      },
      setup(props) {
        console.log(props.title)
      }
    }
```
  **WARNING!!!**  因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
    如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作：
```js
    import { toRefs } from 'vue'
    setup(props) {
      const { title } = toRefs(props)
      console.log(title.value)
    }
```

  2.context:上下文对象(context 是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值：)
      *·attrs*:值为对象，包含:组件外部传递过来，但没有在props配置中声明的属性,相当于 *this.$attrs*.
      *·slots*:收到的插槽内容,相当于*this.$slots* 。
      *·emit*:分发自定义事件的函数,相当于*this.$emit*。
```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)
    
    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)
    
    // 暴露公共 property (函数)
    console.log(context.expose)
  }
}
```
context 是一个普通的 JavaScript 对象,它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。
//但 attrs, slots 是有状态的对象，应该尽量少用解构
```js
      export default {
        setup(props, { attrs, slots, emit, expose }) {
          ...
        }
      }
```

# 9.Vue3中的computed计算属性
·vue2单独一个
```js
computed: {
        num: function () {
            return this.num+1
        }
    }
```
vue3中写法改变，变成一个组合式API，需要引入
```js
import {computed} from 'vue'
setup(){
//计算属性—简写（没有考虑计算属性被修改的情况）
let fullName = computed(()=>{
return person.firstName + '-' + person. lastName
})
```

简单写法无法响应式，完整通过 get和set来变成响应式
```js
//计算属性—完整
let fullName = computed({
  get(){
      return person.firstName + '-' + person.lastName
  },
  set (value) {
    const nameArr = value.split('-')person.firstName = nameArr[o]person.lastName = nameArr[1]
  }
)
```
总结
计算属性本身就是一个computed watcher，说它有缓存效果，实际上就是因为它有两种模式：lazy和activated这两种，默认为layz。

当存在引用时，他就是activated，计算属性依赖的值更新就会触发它的重新计算，不存在引用时，只是修改标志位，只有当下一次有引用时，才进行计算。


# 10.自定义hook函数
·什么是hook?——本质是一个函数，把setup函数中使用的Composition APl进行了封装。
·类似于vue2.x中的mixin。
·自定义hook的优势:复用代码,让setup中的逻辑更清楚易懂。

# 11.**Vue路由的两种模式**
**hash**
原理：早期的前端路由的实现就是基于location.hash来实现的，location.hash的值就是URL中#后面的内容
其实现原理就是监听#后面的内容来发起Ajax请求来进行局部更新，而不需要刷新整个页面。
使用 *hashchange* 事件来监听 URL 的变化，以下这几种情况改变 URL 都会触发 hashchange 事件：浏览器前进后退改变 URL、a标签改变 URL、window.location改变URL。
*优点：*
·兼容低版本浏览器
·只有#符号之前的内容才会包含在请求中被发送到后端，也就是说就算后端没有对路由全覆盖，但是不会返回404错误 hash值的改变，都会在浏览器的访问历史中增加一个记录，所以可以通过浏览器的回退、前进按钮控制hash的切换 会覆盖锚点定位元素的功能
*缺点：*
·不太美观，#后面传输的数据复杂的话会出现问题

**history**
原理：history 提供了 pushState 和 replaceState 两个方法来记录路由状态，这两个方法改变 URL 不会引起页面刷新。pushState(state, title, url) 和 replaceState(state, title, url)都可以接受三个相同的参数。

通过$(window).on('popstate', function () {}） 监听history 实体 变化。

*优点：*
·使用简单，比较美观
·pushState()设置新的URL可以是任意与当前URL同源的URL，而hash只能改变#后面的内容，因此只能设置与当前URL同文档的URL
·pushState()设置的URL与当前URL一模一样时也会被添加到历史记录栈中，而hash#后面的内容必须被修改才会被添加到新的记录栈中
·pushState()可以通过stateObject参数添加任意类型的数据到记录中，而hash只能添加短字符串
·pushState()可额外设置title属性供后续使用

*缺点：*
·前端的URL必须和向发送请求后端URL保持一致，否则会报404错误
·由于History API的缘故，低版本浏览器有兼容行问题

**两种不同使用场景**
·从上文可见，hash模式下url会带有#，当你希望url更优雅时，可以使用history模式。
·当使用history模式时，需要注意在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
·当需要兼容低版本的浏览器时，建议使用hash模式。
·当需要添加任意类型数据到记录时，可以使用history模式。


# 12.vue不常用 composition API
 1. *shallowReactive *              //只对第一层响应式，深层次对象里面的不会改变
    *shallowRef*                  //只处理基本类型的响应式，不进行对象的响应式处理
    ·什么时候使用?
        ·如果有一个对象数据，结构比较深,但变化时只是外层属性变化===> shallowReactive。
        ·如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换===> shallowRef。

2.*readonly 与 shallowReadonly*
      . readonly:让一个响应式数据变为只读的（深只读)。
      . shallowReadonly: 让一个响应式数据变为只读的(浅只读)。
      ·应用场景:不希望数据被修改时。
3.*toRaw 与 markRaw*
    .toRaw:
      ·作用:将一个由reactive *生成的响应式对象转为普通对象*。（ref没有）
      ·使用场景:用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
    .markRaw:
      ·作用:标记一个对象，使其永远不会再成为响应式对象。
      ·有些值不应该被设置为响应式对象，列入第三方库
4.*customRef*
      ·作用:创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制。
5.*provide 与 inject*
      父组件：
   ```js
    provide('name',obj)
   ```
      孙组件:
  ```js
      const myobj = inject('name')
  ```
     
6.*响应式数据的判断*
      ·isRef:检查一个值是否为一个ref 对象
      ·isReactive:检查一个对象是否是由reactive创建的响应式代理
      ·isReadonly:检查一个对象是否是由readonly创建的只读代理
      ·isProxy:检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

# 13.vue3.0对这些API做出了调整

·将全局的API，即:Vue.xxx调整到应用实例( app) 上

| 2.x全局API( vue )                                | 3.x实例APl ( app)           |
| ------------------------------------------------ | --------------------------- |
| vue.config.xxXX                                  | app.config.xxXX             |
| Vue.config.productionTip                         | 移除                        |
| vue.component                                    | app.component               |
| Vue.directive                                    | app.directive               |
| Vue.mixin                                        | app.mixin                   |
| vue.use                                          | app.use                     |
| vue.prototype   //挂载全局对象，在任意处可以调用    | app.config.globalProperties |

# 13.5 vuex的组成部分：
1.state:是存储的基本数据。
2.mutations:提交更改数据。
3.getter:对state加工，和computed计算属性一样。
4.actions：处理异步，通过store.commit方法触发mutations中的方法，从而改变state值。
5.module：是store分割的模块，每个模块拥有自己的state、mutations、getters、actions。

# 14. **Vuex** 模块化+命名空间 与 mapstate 等辅助函数的使用 
## 1.目的:让代码更好维护，让多种数据分类更加明确。
## 2.修改store.js
```js
const countAbout = {
      namespaced:true,   //用辅助函数就得开启命名空间
      state:{x:1},
      mutations: { ... },
      actions: { ... },
      getters: {
        bigSum:(state){
           return state.sum* 10
      }
    }
}

const personAbout = {
    namespaced :true,//开启命名空间
    state:{ ... },
    mutations: { ... },
    actions: {...}
}
  
const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```


## 3.开启命名空间后，组件中读取state数据:
```js
  //方式一:自己直接读取
  this.$store.state.personAbout.list
  //方式二:借助mapState读取:
  ...mapState( 'countAbout' ,[ 'sum' , 'school' , 'subject' ])
```
## 4.开启命名空间后，组件中读取getters数据:
```js
  //方式一:自己直接读取
  this.$store.getters [ 'personAbout/firstPersonName ' ]
  //方式二:借助mapGetters读取:
  ...mapGetters( 'countAbout',[ 'bigSum'])
```

## 5.开启命名空间后，组件中调用dispatch
```js
  //方式一，自己直接dispatch
  this.$store.dispatch( ' personAbout/addPersonWang ' ,person)
  //方式二:借助mapActions:
  ...mapActions( 'countAbout' ,{incrementOdd: 'jiaodd' ,incrementWait: 'jiawait '})
```

## 6.开启命名空间后，组件中调用commit
  ```js
  //方式一:自己直接commit
  this.$store.commit( " personAbout/ADD_PERSON ' , person)
  //方式二:借助 mapMutations:
  ...mapMutations( 'countAbout' ,{increment: '"IA' , decrement : ' JIAN'}),
  ```
*

# 15.ref 和 toRef 的区别
ref是对原始数据的拷贝，当修改ref数据时，模板中的视图会发生改变，但是原始数据并不会改变。
toRef是对原始数据的引用，修改toRef数据时，原始数据也会发生改变，但是视图并不会更新。
  ·作用:创建一个 ref 对象，其value值指向另一个对象的某个属性。
  ·语法: const name = toRef( person , 'name')
  ·应用:要将响应式对象中的某个属性单独提供给外部使用时。
  ·扩展: toRefs 与toRef功能一致，但可以批量创建多个ref对象，语法: toRefs(person)
```js
let b = "yzy"
let a = ref（b）
<div>{{b}}</div>
<div>{{a}}</div>
<button @click=" a += '#'  "></button>
```
触发点击事件后，a变了，b不变。因为 ref 是对原数据的深拷贝，触发事件，ref响应式触发造成页面重新渲染，不会对原数据造成影响。
如果直接对原数据修改，原数据变了，但不是响应式，所以页面不刷新，UI也就不会变。
<div>{{a}}</div>
<div>{{b}}</div>

-------------------------------------
此外 
```js
let  person= reactive（{
    name：123
}）
return {
    name:person.name
  }
}
<div>{{name}}</div>
通过这种类型传递的 name 也是一个 ref类型的对象，是深拷贝，不会对原数据影响
```


# 16.vue 的一些不常用指令或API
  ## 1. VUE2 的 filter 过滤器 （Vue3 已经移除，推荐使用计算属性）
  定义:对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理)。语法:
    1.注册过滤器:
       ·在全局注册 Vue.filter(name, callback)
       ·在组件中定义 （不用写在method中，和data，computed，method同一级别）
            filters:{
              过滤器名(){
                return ···
              }
           } 

    2.使用过滤器:{{ xxx│过滤器名 }}或  v-bind:属性= "xxx│过滤器名"
  备注:
    1.过滤器也可以接收额外参数、多个过滤器也可以串联
    2.并没有改变原本的数据,是产生新的对应的数据


  ## 2.v-html指令:
1.作用:向指定节点中渲染包含html结构的内容。
2.与插值语法的区别;
  (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
  (2).v-html可以识别html结构。
3.严重注意:v-html有安全性问题!!!!
  (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
  (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上!

  ## 3.v-text指令:
  1.和v-html一样功能，会替换节点中所有的内容，不过不能识别 HTML 结构。

  ## 4.v-cloak指令（没有值):
1.本质是一个特殊属性，Vue实例创建完毕并接管容都后，会删掉v-cloak属性。
2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。不要让用户看到差值语法
```
[v-cloak] {
  display: none;
}
-----------------------
<div v-cloak>
  {{ message }}
</div>
```

  ## 5.v-once 指令:
1.v-once所在节点在初次动态渲染后,就视为静态内容了。(等于展示初始值后不变)
2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

  ## 6.v-pre 指令:
1.跳过其所在节点的编译过程。
2.可利用它跳过:没有使用指令语法、没有使用插值语法的节点，会加快编译。


# 17.**跨域解决**（代理转发，cors，JSONP，Ngix）
## 代理转发
```js
在 vue.config.js 文件中配置
module.exports = {
  devServer: {
    proxy: {
        '/api': {
          target: 'http://localhost:3000' // 要代理的真实接口地址
          changeOrigin:true,              //代理是否告诉目标服务器 自己的真正端口还是目标的3000
          pathRewrite:''                  //重写，将 '/api' 重写(这里重写为空，保证路径正确)
        }
      }
    }
  }
```

## cors 跨域资源共享
### 后端设置
```js
var express = require('express');
var app = express();
var Head = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-control-allow-credentials',true);
  next();
}
app.use(Head);
```
### 前端 配合(withCredentials: true)
```js
Axios 配置
const axiosInstance = axios.create({
  withCredentials: true
})
axiosInstance.interceptors.request.use(config => {
  const token = ls.get('token') //从 localstorage 中获取token
  if (token) {
    config.headers['auth-token'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axiosInstance.interceptors.response.use(response => {
  const token = response.headers['auth-token']
  token && ls.set('token', token) //将 token 存入 localstorage
  return response.data
}, function (error) {
  return Promise.reject(error)
})
 
```
##### cookie samesite问题 无法携带 cookie 
原因是 chrome 2020年新版本的浏览器更改了 cookie 的一个属性：samesite
以前版本的 samesite 默认值是 none ，即只要配置了上述的 cors 跨域就可以带上 cookie。
但是现在的默认值改成了 lax, 即只能在主域名相同情况下携带 cookie

## nginx上的CORS配置：
```js
location / {
     if ($request method = 'OPTIONS') { 
         add_ header ' Access -Control- Allow-0rigin' *';
         add_ header ” Access Control- Allow-Methods' 'GET， POST， OPTIONS' ;
         add header Access Control Max-Age ' 86400；6 add header ' Content-Type’” text/plain' ;
         add header ' Content-Length’0;
         return 204;
    }
    if ($request_ method = 'GET') {
         add_ header ' Access -Control-Allow-0rigin' 本';
         add header ' Access-Control-Al low-Methods' 'GET， POST， OPTIONS' ;
         add_ header' Access Control -Allow-Headers”'User-Agent ， X- Requested -With ， Cache - Control ， Content -Type;
    }
}
```
*http头如何做缓存*
```js
// 没有缓存
Cache-Control: no-cache

// 私有缓冲
Cache-Control: private

// 公共缓存
Cache-Control: public

// 过期
Cache-Control: max-age=3153600

// 验证方式
Cache-Control: must-revalidate
```


# 18.Vue2 和 Vue3 全局事件总线(GlobalEventBus)
  ## Vue2
1.一种组件间通信的方式，适用于任意组件间通信。
2.安装全局事件总线:
```js
new vue({
      ·····
      beforeCreate(){
      Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
      },
})
```
3.使用事件总线:
·接收数据:A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。
```js
methods(){
  demo(data){
    ......
    }
......
  mounted() {
  this.$bus.$on( 'xxxx' ,this.demo)
  }
```

·提供数据:*this.$bus.$emit( 'xxxx',数据)*
·最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

  ## Vue3
Vue3.x以后从实例中移除了 $on ,$off 和 $once 方法,$emit 仍然是现有 API 的一部分，只能实现子组件触发父组件的方法。
使用mitt之前先安装mitt模块
```js
  1.安装mitt
    npm install --save mitt或者yarn add mitt -S

  2.推荐独立为它在src目录下创建utils文件夹下创建index.ts文件
    import mitt from 'mitt'
    const bus = mitt()
    export default bus

  3.哪个文件要使用就在文件里引用
  import bus from '@/utils'
```

# 19.子组件触发父组件方法(emit)注意点
  ## 子组件 child.vue
```html
<template>
       <div>
           <button @click ="go" >go</button>
       </div>
</template>
 
<script>
import Vue from 'vue'
import {defineComponent} from "vue"
export default defineComponent({
  emits:['haha'],                      //注意要加emits 告诉vue使用 emit
   setup(prop,context){
           go(){
               context.emit("haha")  
       }
       return {
           
       }
   } 
})
</script>
```
  ## 父组件
```js
<child @haha = 'gogo'><child>
<script>
···
const gogo =() ={
  console.log("这里是父组件方法，被子组件的点击事件通过emit触发")
}
</script>
```

# 20.**自定义指令directive**（vue3的自定义指令里的生命周期与vue2的不同）
 注意：指令定义时不需要加v-, 使用时需要加 
 *指令定义函数提供如下钩子函数：*

  ### 可以接受两个参数：
  ·el
    指令绑定到的元素。这可用于直接操作 DOM。
  ·binding
    包含以下 property 的对象：
      ·instance：使用指令的组件实例。
      ·value：传递给指令的值。
      ·oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。值是否已更改都可用。
      ·arg：参数传递给指令 (如果有)。
      ·modifiers：包含修饰符 (如果有) 
      ·dir：一个对象，在注册指令时作为参数传递。
```js
    const app = Vue.createApp({})
    // 注册一个全局自定义指令 `v-focus`
    app.directive('focus', {
       // 指令是具有一组生命周期的钩子：

      // 在绑定元素的 attribute 或事件监听器被应用之前调用
      created(el,binding) {},
      // 在绑定元素的父组件挂载之前调用
      beforeMount() {},
      // 当被绑定的元素挂载到 DOM 中时……
      mounted() {}，
      // 在包含组件的 VNode 更新之前调用
      beforeUpdate() {},
      // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
      updated() {},
      // 在绑定元素的父组件卸载之前调用
      beforeUnmount() {},
      // 卸载绑定元素的父组件时调用
      unmounted() {}

    // vue2的自定义指令生命周期函数
    // bind: function () {},
    // inserted: function () {},
    // update: function () {},
    // componentUpdated: function () {},
    // unbind: function () {}

    })



```
    如果想注册局部指令，组件中也接受一个 directives 的选项：

```js
    directives: {
      'focus': {
        // 指令的定义
        mounted(el,binding) {
          el.focus()
        }
      }
    }
```

# 21.computed与watch
computed 和 watch 本质都是通过实例化 Watcher 实现，最大区别就是适用场景不同。

**computed**
计算属性，依赖其他属性值，且值具备缓存的特性。只有它依赖的属性值发生改变，下一次获取的值才会重新计算。
适用于数值计算，并且依赖于其他属性时。因为可以利用缓存特性，避免每次获取值，都需要重新计算。

**watch**
观察属性，监听属性值变动。每当属性值发生变化，都会执行相应的回调。
适用于数据变化时执行异步或开销比较大的操作。

# 22.vnode的理解
vnode 虚拟DOM节点 创建：
```js
export function Vnode (){
    return {
        tag:'div',
        children: 'span',
        attr:'',
        text:'你好!'
    }
}
```

# 23.new Vue后整个的流程
·initProxy：作用域代理，拦截组件内访问其它组件的数据。
·initLifecycle：建立父子组件关系，在当前组件实例上添加一些属性和生命周期标识。如[Math·Processing Error]parent,parent,refs,$children,_isMounted等。
·initEvents：对父组件传入的事件添加监听，事件是谁创建谁监听，子组件创建事件子组件监听
·initRender：声明[Math Processing Error]slots和slots和createElement()等。
·initInjections：注入数据，初始化inject，一般用于组件更深层次之间的通信。
·initState：重要）数据响应式：初始化状态。很多选项初始化的汇总：data,methods,props,computed和watch。
·initProvide：提供数据注入。

  ## 思考：为什么先注入再提供呢？？
答：1、首先来自祖辈的数据要和当前实例的data,等判重，相结合，所以注入数据的initInjections一定要在InitState的上面。2. 从上面注入进来的东西在当前组件中转了一下又提供给后代了，所以注入数据也一定要在上面。



# 24.你知道Vue3有哪些新特性吗？它们会带来什么影响？
·性能提升
  更小巧、更快速
  支持自定义渲染器
  支持摇树优化：一种在打包时去除无用代码的优化手段
  支持Fragments和跨组件渲染

·API变动
  模板语法99%保持不变
  原生支持基于class的组件，并且无需借助任何编译及各种stage阶段的特性
  在设计时也考虑TypeScript的类型推断特性
  重写虚拟DOM可以期待更多的编译时提示来减少运行时的开销
  优化插槽生成可以单独渲染父组件和子组件
  静态树提升降低渲染成本
  基于Proxy的观察者机制节省内存开销

·不兼容IE11
  检测机制更加全面、精准、高效,更具可调试式的响应跟踪

# 25.你都做过哪些Vue的性能优化？
编码阶段
尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
v-if和v-for不能连用
如果需要使用v-for给每项元素绑定事件时使用事件代理
SPA 页面采用keep-alive缓存组件
在更多的情况下，使用v-if替代v-show
key保证唯一
使用路由懒加载、异步组件
防抖、节流
第三方模块按需导入
长列表滚动到可视区域动态加载
图片懒加载
SEO优化
预渲染
服务端渲染SSR
打包优化
压缩代码
Tree Shaking/Scope Hoisting
使用cdn加载第三方模块
多线程打包happypack
splitChunks抽离公共文件
sourceMap优化
用户体验
骨架屏
PWA
还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。


# 26.Vue.$nextTick实现原理，是宏任务还是微任务
## 1.官方定义：Vue.nextTick([callback,context])
    在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新之后的DOM

## 2.vue如何检测到DOM更新完毕呢？
    能监听到DOM改动的API：MutationObserver
    MutationObserver 是HTML5新增的属性，用于监听DOM修改事件，能够监听到节点的属性、文本内
    容、子节点等的改动，是一个功能强大的利器。
```js
//MutationObserver基本用法 
var observer = new MutationObserver(function(){   //这里是回调函数 
  console.log('DOM被修改了！'); 
}); 
var article = document.querySelector('article'); 
observer.observer(article); 
```

## 3.Vue.$nextTick 的原理
nextTick：在下次 DOM 更新循环结束之后执行延迟回调。常用于修改数据后获取更新后的DOM。
源码位置：vue/src/core/util/next-tick.js
```js
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

// 是否使用微任务标识
export let isUsingMicroTask = false

// 回调函数队列
const callbacks = []
// 异步锁
let pending = false

function flushCallbacks () {
  // 表示下一个 flushCallbacks 可以进入浏览器的任务队列了
  pending = false
  // 防止 nextTick 中包含 nextTick时出现问题，在执行回调函数队列前，提前复制备份，清空回调函数队列
  const copies = callbacks.slice(0)
  // 清空 callbacks 数组
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

// 浏览器能力检测
// 使用宏任务或微任务的目的是宏任务和微任务必在同步代码结束之后执行，这时能保证是最终渲染好的DOM。
// 宏任务耗费时间是大于微任务，在浏览器支持的情况下，优先使用微任务。
// 宏任务中效率也有差距，最低的就是 setTimeout
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 将 nextTick 的回调函数用 try catch 包裹一层，用于异常捕获
  // 将包裹后的函数放到 callback 中
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // pengding 为 false, 执行 timerFunc
  if (!pending) {
    // 关上锁
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

## 4.总结：
运用异步锁的概念，保证同一时刻任务队列中只有一个 flushCallbacks。当 pengding 为 false 的时候，表示浏览器任务队列中没有 flushCallbacks 函数；当 pengding 为 true 的时候，表示浏览器任务队列中已经放入 flushCallbacks；待执行 flushCallback 函数时，pengding 会被再次置为 false，表示下一个 flushCallbacks 可进入任务队列。
环境能力检测，选择可选中效率最高的（宏任务/微任务）进行包装执行，保证是在同步代码都执行完成后再去执行修改 DOM 等操作。
flushCallbacks 先拷贝再清空，为了防止nextTick嵌套nextTick导致循环不结束


# 27.**Vue3.0 里为什么要用 Proxy API 替代 defineProperty API？**
参考回答：
响应式优化。
a. *defineProperty* API 的局限性最大原因是它只能针对*单例属性*做监听。
Vue2.x 中的响应式实现正是基于 defineProperty 中的 descriptor，对 data 中的属性做了遍历 + 递归，为每个属性设置了getter、setter。这也就是为什么 Vue 只能对 data 中预定义过的属性做出响应的原因，在 Vue 中使用下标的方式直接修改属性的或者添加一个预先不存在的对象属性是无法做到 setter 监听的，这是 defineProperty 的局限性。

b. *Proxy* API 的监听是*针对一个对象*的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

c. *响应式是惰性的*
在 Vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗。
在 Vue.js 3.0 中，使用 Proxy API 并不能监听到对象内部深层次的属性变化，因此它的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是按需实现响应式，减少性能消耗


# 28.前端开发中的 MVC/MVP/MVVM 模式
·Model:层用于封装和应用程序的业务逻辑相关的数据以及对数据的处理方法。
·View:作为视图层，主要负责数据的展示。
·controller:现在通过Model&View完成了数据从模型层到视图层的逻辑。但对于一个应用程序，这远远是不够的，我们还需要响应用户的操作、同步更新View和Model。于是，在MVC中引入了控制器controller，让它来定义用户界面对用户输入的响应方式，它连接模型和视图，用于控制应用程序的流程，处理用户的行为和数据上的改变。

## MVC
MVC:允许在不改变视图的情况下改变视图对用户输入的响应方式，用户对View的操作交给了Controller处理，在Controller中响应View的事件调用Model的接口对数据进行操作，一旦Model发生变化便通知相关视图进行更新。

*MVC模式的业务逻辑主要集中在Controller*，而前端的View其实已经具备了独立处理用户事件的能力，当每个事件都流经Controller时，这层会变得十分臃肿。而且MVC中View和Controller一般是一一对应的，捆绑起来表示一个组件，*视图与控制器间的过于紧密的连接让Controller的复用性成了问题*，如果想多个View共用一个Controller该怎么办呢？这里有一个解决方案：MVP

## MVP
虽然在MVC里，View是可以直接访问Model的，但MVP中的View并不能直接使用Model，而是通过为Presenter提供接口，让Presenter去更新Model，再通过观察者模式更新View。
与MVC相比，MVP模式通过解耦View和Model，完全分离视图和模型使职责划分更加清晰；由于View不依赖Model，可以将View抽离出来做成组件，它只需要提供一系列接口提供给上层操作。

*Presenter作为View和Model之间的“中间人”，除了基本的业务逻辑外，还有大量代码需要对从View到Model和从Model到View的数据进行“手动同步”，这样Presenter显得很重，维护起来会比较困难。*而且由于没有数据绑定，如果Presenter对视图渲染的需求增多，它不得不过多关注特定的视图，一旦视图需求发生改变，Presenter也需要改动。

## MVVM
*MVVM把View和Model的同步逻辑自动化了。*以前Presenter负责的View和Model同步不再手动地进行操作，而是交给框架所提供的数据绑定功能进行负责，只需要告诉它View显示的数据对应的是Model哪一部分即可。
![MVVM](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\MVVM.png)



# 29.Vue的 Mixins 混合
当多个组件的逻辑代码有许多相似时，将相同的逻辑代码抽离放入一个单独的文件。在需要用到的组件中通过 Mixins Api引入
1.在发生冲突时以组件数据优先。
2.同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
3.值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
```js
// Mixmindemo.js
export const  demoMixins = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
   created: function () {
    console.log('混入对象的钩子先被调用')
  },
  methods:{
    ...
  }
}

// demoComponent.vue
import {demoMixins} from '../Mixmindemo.js'
export default {
  mixins: [demoMixins],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
}
```

# 30.Vue3的 globalProperties (代替Vue2的 Vue.prototype 的挂载)
在Vue2中，可以通过 Vue.prototype.$axios 在全局 Vue 上挂载 axios，在组件中使用 this.$axios() 使用
在 Vue3 中，由于 setUp没有this，所以 globalProperties代替方法
```js
//在 vue3 的 main.js 中
const App = createApp(app);
App.config.globalProperties = $axios

//在组件中使用
import {getCurrentInstance} from 'vue'

// const {ctx} = getCurrentInstance() //ctx 和 proxy 效果一样，不过只能在开发阶段使用，打包就会失效
const {proxy} = getCurrentInstance()//获取上下文实例
//使用
proxy.$axios()
```

# 31.Vue 路由传参方式
*方案一*
```js
{
  path: '/detail/:id',
  name: 'Detail',
  component: () => import('./Detail.vue')
}
// 路由跳转
let id = 1
this.$router.push({ path: '/detail/${id}'})
// 获取参数
this.$route.params.id
```
*方案二*
方案二URL 虽然不显示我们的传参，但是是可以在子组件获取参数的。当然也有问题：会存在刷新丢失参数。
若想不丢失，需和方案一路由配置一样。原因是第二种方式传参是上一个页面 push 函数中携带的，刷新没有 push 的动作。
```js
{
  path: '/detail',
  name: 'Detail',
  component: () => import('./Detail.vue')
}
// 路由跳转
let id = 1
this.$router.push({ name: 'Detail', params: { id: id } })
// 获取参数
this.$route.params.id
```
*方案三*
```js
{
  path: '/detail',
  name: 'Detail',
  component: () => import('./Detail.vue')
}
// 路由跳转
let id = 1
this.$router.push({ name: 'Detail', query: { id: id } })
// 获取参数
this.$route.query.id
```

# 32.Vue-Router 完整的导航解析流程
·导航被触发
·在失活的组件里调用 beforeRouteLeave 守卫
·调用全局 beforeEach 前置守卫
·重用的组件调用 beforeRouteUpdate 守卫（2.2+）
·路由配置调用 beforeEnter
·解析异步路由组件
·在被激活的组件里调用 beforeRouteEnter 守卫
·调用全局的 beforeResolve 守卫（2.5+）
·导航被确认
·调用全局的 afterEach
·触发 DOM 更新
·调用  beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

# 33.Vue-Router 有哪几种导航守卫
**1.全局前置守卫 !!!**
在路由跳转前触发，可在执行 next 方法前做一些身份登录验证的逻辑。
```js
const router = new VueRouter({})

router.beforeEach((to, from, next) => {
  ...
  // 必须执行 next 方法来触发路由跳转 
  next() 
})
```

**2.全局解析守卫**
与 beforeEach 类似，也是路由跳转前触发，区别是还需在所有组件内守卫和异步路由组件被解析之后，也就是在组件内 beforeRouteEnter 之后被调用。
```js
const router = new VueRouter({})
router.beforeResolve((to, from, next) => {
  ...
  // 必须执行 next 方法来触发路由跳转 
  next() 
})
})
```

**3.全局后置钩子**
和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身。
```js
router.afterEach((to, from) => {
  // ...
})
```

**4.路由独享守卫 !!!**
可在路由配置上直接定义 beforeEnter
```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      beforeEnter: (to, from, next) => {
      
      }
    }
  ]
})
```
**5.组件内的守卫**
组件内可直接定义如下路由导航守卫
```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 不能获取组件实例 this
    // 当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 当前路由改变，但是组件被复用时调用
    // 可访问实例 this
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开组件时被调用
  }
}
```

# 34. 介绍一下 keep-alive 与 keep-alive 的实现
keep-alive 是 Vue 内置的一个组件，可以缓存组件的状态，避免重复渲染，提高性能。
*keep-alive 内置组件有3个属性：*
*·include：*字符串或正则表达式，名称匹配的组件会被缓存。
*·exclude：*字符串或正则表达式，名称匹配的组件不会被缓存。
*·max：*缓存组件数量阈值
设置 keep-alive 的组件，会*增加两个生命钩子（activated / deactivated）*。

首次进入组件：beforeCreate -> created -> beforeMount -> mounted -> activated
离开组件触发deactivated，因为组件缓存不销毁，所以不会触发 beforeDestroy 和 destroyed 生命钩子。再次进入组件后直接从 activated 生命钩子开始。

思路：vuex 使用数组存储列表页名字，列表页离开结合 beforeRouteLeave 钩子判断是否需要缓存，对全局数组进行更改。
核心源码：vue/src/core/components/keep-alive.js
 ## keep-alive 的实现
*LRU（Least Recently Used）* 替换策略核心思想是替换最近最少使用。
```js
/**
* 遍历 cache 将不需要的缓存的从 cache 中清除
*/
function pruneCache (keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
/**
* 删除 cache 中键值为 key 的虚拟DOM
*/
function pruneCacheEntry (cache, key, keys, current) {
  const entry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    // 执行组件的 destroy 钩子
    entry.componentInstance.$destroy()
  }
  // cache 中组件对应的虚拟DOM置null
  cache[key] = null
  // 删除缓存虚拟DOM的 key
  remove(keys, key)
}

export default {
  name: 'keep-alive',
  abstract: true,  

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    // 缓存虚拟 DOM
    this.cache = Object.create(null) 
    // 缓存虚拟DOM的键集合
    this.keys = [] 
  },

  destroyed () {
    // 删除所有的缓存内容
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 监听 include、exclude 参数变化，调用 pruneCache修改缓存中的缓存数据
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  // 由 render 函数决定渲染结果
  render () {
    const slot = this.$slots.default
    // 获取第一个子组件虚拟DOM
    const vnode: VNode = getFirstComponentChild(slot)
    // 获取虚拟 DOM 的配置参数
    const componentOptions: ? VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // 获取组件名称
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      // 若不在include或者在exclude中，直接退出，不走缓存机制
      if (
        (include && (!name || !matches(include, name))) ||
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      // 获取组件key
      const key: ?string = vnode.key == null
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      // 命中缓存
      if (cache[key]) {
        // 从 cache 中获取缓存的实例设置到当前的组件上
        vnode.componentInstance = cache[key].componentInstance
        // 删除原有存在的key，并置于最后
        remove(keys, key)
        keys.push(key)
      // 未命中缓存
      } else {
        // 缓存当前虚拟节点
        cache[key] = vnode
        // 添加当前组件key
        keys.push(key)
        // 若缓存组件超过max值，LRU 替换
        if(this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
      // 设置当前组件 keep-alive 为 true
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```

# 35.Vue 过滤器 filter 了解么
Vue 过滤器可用在两个地方：双花括号插值和 v-bind 表达式。
*Vue3 中已经废弃这个特点。*
过滤器分为 全局过滤器 和 局部过滤器。

## 局部过滤器
```js
<template>
  <div>{{ message | formatMessage }}</div>
</template>
<script>
export default {
  filters: {
    formatMessage: function(value) {
      // 可基于源值做一些处理
      return value
    }
  }
}
</script>
```

## 全局过滤器
```js
Vue.filter('formatMessage', function(value) {
  // 可基于源值做一些处理
  return value
})

过滤器可串联，执行顺序从左到右，第二个过滤器输入值是第一个过滤器的输出值。
<div>{{ message | formatMessage1 | formatMessage2 }}</div>
```

# 36.Vue.$delete 和 delete 的区别
Vue.$delete 是直接删除了元素，*改变了数组的长度*；
delete 是将被*删除的元素变成 undefined* ，其他*元素键值不变*。

# 37.Vue.$set 如何解决对象与数组新增属性或值不能响应的问题
Vue.$set的出现是由于Object.defineProperty的局限性：无法检测对象属性的新增或删除，无法检测数组值的修改。

源码位置：vue/src/core/observer/index.js
```js
export function set(target, key, val) {
  // 数组
  if(Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组长度，避免索引大于数组长度导致splice错误
    target.length = Math.max(target.length, key)
    // 利用数组splice触发响应
    target.splice(key, 1, val)
    return val
  }

  // targe 是对象的情况
  // key 已经存在，直接修改属性值
  if(key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = target.__ob__
  // target 不是响应式数据，直接赋值
  if(!ob) {
    target[key] = val
    return val
  }
  //key 不在 target 中，响应式处理属性
  defineReactive(ob.value, key, val)
  // 派发更新
  ob.dep.notify()
  return val
}
实现原理：
若是数组，直接使用数组的 splice 方法触发响应式。
若是对象，判断属性是否存在，对象是否是响应式。
以上都不满足，最后通过 defineReactive 对属性进行响应式处理。

```
## 1.如何监测对象中的数据( $set 解决vue2对象新增属性不能响应的问题)?
通过setter实现监视,且要在new Vue时就传入要监测的数据。
    (1).对象中后追加的属性，Vue默认不做响应式处理
    (2).如需给后添加的属性做响应式,请使用如下API:
              Vue.set(target, propertyName/index, value）或 
              vm.$set(target, propertyName/index,value)

## 2.在Vue修改数组中的某个元素一定要用如下方法:
      1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
      2.Vue.set(）或vm.$set()

# 38.为什么 v-if 不能和 v-for 一起使用
性能浪费，每次渲染都要先循环再进行条件判断，考虑用计算属性替代。

Vue2.x中v-for比v-if更高的优先级。
Vue3.x中v-if 比 v-for 更高的优先级。

# 39.Vue 父组件和子组件生命周期执行顺序
**1·加载渲染过程**
*父先创建，才能有子；子创建完成，父才完整。*
顺序：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

**2·子组件更新过程**
*子组件更新 影响到 父组件的情况。*
顺序：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
*子组件更新 不影响到 父组件的情况。*
顺序：子 beforeUpdate -> 子 updated

**3·父组件更新过程**
*父组件更新 影响到 子组件的情况。*
顺序：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
*父组件更新 不影响到 子组件的情况。*
顺序：父 beforeUpdate -> 父 updated

**4·销毁过程**
顺序：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

# 40.**Vue 生命周期**
*beforeCreate*  	vue实例初始化后，数据观测（data observer）和事件配置之前。*data、methods都无法访问。*
*created*	      vue实例创建完成后立即调用 ，可访问 data、computed、watch、methods。*未挂载 DOM*，不能访问ref。
*beforeMount*	    在 DOM 挂载开始之前调用。
*mounted*	        vue实例被挂载到 DOM。
*beforeUpdate*	  数据更新之前调用，发生在虚拟 DOM 打补丁之前。
*updated*	        数据更新之后调用。
*beforeDestroy*	  实例销毁前调用。
*destroyed*	      实例销毁后调用 。
调用异步请求可在created、beforeMount、mounted生命周期中调用，因为相关数据都已创建。最好的选择是在created中调用。
获取DOM在mounted中获取，获取可用$ref方法，这点毋庸置疑。

# 41.vue 中怎么重置 data?
在vue中：
this.$data 获取当前状态下的data
this.$options.data() 获取该组件初始状态下的data
然后我们利用如下方法实现：
Object.assign(this.$data, this.$options.data())


# 42.组件中写 name 选项有什么作用
1, 项目使用 keep-alive 时，可搭配组件 name 进行缓存过滤
2, DOM 做递归组件时需要调用自身 name
3, Vue-devtools 调试工具里显示的组见名称是由 Vue 中组件 name 决定的

# 43.vue-cli 替我们做了哪些工作？
.vue 文件 --> .js 文件
ES6 语法 --> ES5 语法
Sass,Less,Stylus --> CSS
对 jpg,png,font 等静态资源的处理
热更新
定义环境变量，区分 dev 和 production 模式

# 44.vue中  router 与 route 区别
*1、$route对象*
        $route对象表示*当前的路由信息*，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。

*·$route.path*字符串，对应当前路由的路径，总是解析为绝对路径，如"/foo/bar"。
*·$route.params*一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象。
*·$route.query* 一个 key/value 对象，表示URL查询参数。例：/foo?user=1，则有$route.query.user == 1
·*$route.hash* 当前路由的hash值 (不带#) ，如果没有 hash 值，则为空字符串。锚点*
*·$route.fullPath* 完成解析后的 URL，包含查询参数和hash的完整路径。
*·$route.matched* 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
*·$route.name* 当前路径名字
*·$route.meta* 路由元信息
导航钩子的参数：
router.beforeEach((to,from, next)=>{//to 和from都是 路由信息对象,后面使用路由的钩子函数就容易理解了})

*2、$router对象*
        $router对象是*全局路由的实例*，是router构造方法的实例
        ·push
        ·go
        ·replace

# 45.vue3 路由hash与History的设置（createWebHistory，createWebHashHistory）
一、history
关键字：*createWebHistory*
```js
import { createRouter, createWebHistory } from 'vue-router'
const routes = [ {
  path: '/userinfo',
  name: 'UserInfo',
  component: () => import('../views/UserInfo.vue')
}]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```

一、history
关键字：*createWebHistory*
```js
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [{
  path: '/userinfo',
  name: 'UserInfo',
  component: () => import('../views/UserInfo.vue')
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router

```

# 46. **Diff对比流程**
1.Diff算法是一种*对比算法*。对比两者是旧虚拟DOM和新虚拟DOM，对比出是哪个虚拟节点更改了，找出这个虚拟节点，并只更新这个虚拟节点所对应的真实节点，而不用更新其他数据没发生改变的节点，实现精准地更新真实DOM，进而提高效率。
2.*Diff同层对比:*新旧虚拟DOM对比的时候，Diff算法比较只会在同层级进行, 不会跨层级比较。 所以Diff算法是:深度优先算法。 时间复杂度:O(n)
3.*Diff对比流程:*当数据改变时，会触发setter，并且通过Dep.notify去通知所有订阅者Watcher，订阅者们就会调用patch方法，给真实DOM打补丁，更新相应的视图。
**4.patch方法**:对比当前同层的虚拟节点是否为同一种类型的标签(同一类型的标准，下面会讲)：
是：继续执行patchVnode方法进行深层比对
否：没必要比对了，直接整个节点替换成新虚拟节点
*patch的核心原理代码*
```js
function patch(oldVnode, newVnode) {
  // 比较是否为一个类型的节点
  if (sameVnode(oldVnode, newVnode)) {
    // 是：继续进行深层比较
    patchVnode(oldVnode, newVnode)
  } else {
    // 否
    const oldEl = oldVnode.el // 旧虚拟节点的真实DOM节点
    const parentEle = api.parentNode(oldEl) // 获取父节点
    createEle(newVnode) // 创建新虚拟节点对应的真实DOM节点
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
      api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
      // 设置null，释放内存
      oldVnode = null
    }
  }

  return newVnode
}
```
**5.sameVnode方法**
patch关键的一步就是sameVnode方法判断是否为同一类型节点，那问题来了，怎么才算是同一类型节点呢？这个类型的标准是什么呢？
*核心原理代码:*
```js
function sameVnode(oldVnode, newVnode) {
  return (
    oldVnode.key === newVnode.key &&                  // key值是否一样
    oldVnode.tagName === newVnode.tagName &&          // 标签名是否一样
    oldVnode.isComment === newVnode.isComment &&      // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) &&  // 是否都定义了data
    sameInputType(oldVnode, newVnode)                 // 当标签为input时，type必须是否相同
  )
}
```
**6.patchVnode方法**
·找到对应的真实DOM，称为el
·判断newVnode和oldVnode是否指向同一个对象，如果是，那么直接return
·如果他们都有文本节点并且不相等，那么将el的文本节点设置为newVnode的文本节点。
·如果oldVnode有子节点而newVnode没有，则删除el的子节点
·如果oldVnode没有子节点而newVnode有，则将newVnode的子节点真实化之后添加到el
·如果两者都有子节点，则执行*updateChildren函数*比较子节点，这一步很重要
```js
function patchVnode(oldVnode, newVnode) {
  const el = newVnode.el = oldVnode.el // 获取真实DOM对象
  // 获取新旧虚拟节点的子节点数组
  const oldCh = oldVnode.children, newCh = newVnode.children
  // 如果新旧虚拟节点是同一个对象，则终止
  if (oldVnode === newVnode) return
  // 如果新旧虚拟节点是文本节点，且文本不一样
  if (oldVnode.text !== null && newVnode.text !== null && oldVnode.text !== newVnode.text) {
    // 则直接将真实DOM中文本更新为新虚拟节点的文本
    api.setTextContent(el, newVnode.text)
  } else {
    // 否则

    if (oldCh && newCh && oldCh !== newCh) {
      // 新旧虚拟节点都有子节点，且子节点不一样

      // 对比子节点，并更新
      updateChildren(el, oldCh, newCh)
    } else if (newCh) {
      // 新虚拟节点有子节点，旧虚拟节点没有

      // 创建新虚拟节点的子节点，并更新到真实DOM上去
      createEle(newVnode)
    } else if (oldCh) {
      // 旧虚拟节点有子节点，新虚拟节点没有

      //直接删除真实DOM里对应的子节点
      api.removeChild(el)
    }
  }
}
```
**7.updateChildren方法**
这是patchVnode里最重要的一个方法，进行新旧虚拟节点的子节点对比.
通过首尾指针法，新的子节点集合和旧的子节点集合，各有首尾两个指针


# 47. **Vue diff算法优化(vue3 优化的一方面)**
*1.静态标记*
*2.静态提升：*
  Vue2.x中无论元素是否参与更新，每次都会重新创建然后渲染
  Vue3.0中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可
*3.事件侦听器缓存：*
  默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化
  但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可
*4.源码体积有优化*
  与Vue2相比较，Vue3整体体积变小了，移除了一些比较冷门的feature：如 keyCode 支持作为 v-on 的修饰符、on、off 和 $once 实例方法、filter过滤、内联模板等。tree-shaking 依赖 ES2015 模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记。任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小。

# 48. Vue-Router keep-alive使用技巧
```js
//路由文件
const routes={
  path:'/',
  component:Home,
  //meta 标识符 也是路由配置里面可以写的
  meta:{
    isAlive:false
  }
}

<router-view v-if="!$route.meta.isAlive"></router-view>
<keep-alive>
   <router-view  v-if="$route.meta.isAlive"></router-view>
</keep-alive>

```

# 49. **Vue组件通信方式**
*1. props/$emit*
*2.v-slot*
*3. $refs/$parent/$children/$root:*
  $refs： 我们通常会将 refs 绑定在子组件上，从而获取子组件实例。
  $parent：通过 $parent 来获取当前组件的父组件实例（如果有的话）。
  $children来获取当前组件的子组件实例的数组。但是需要注意的是，this.$children`数组中的元素下标并不一定对用父组件引  用的子组件的顺序，例如有异步加载的子组件，可能影响其在 children 数组中的顺序。所以使用时需要根据一定的条件例如子组  件的name去找到相应的子组件。
  $root： 获取当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。通过 $root ，我们可以实现组件之间的跨级通信。
*4.$attrs 和 listeners*
  $attrs： 用来接收父作用域中不作为 prop 被识别的 attribute 属性，并且可以通过v-bind="$attrs"传入内部组件——在创建高级别的组件时非常有用。
*5. provide/inject*
*6. eventBus*

# 50.*Vue3 相比于 Vue2 的有哪些 “与众不同” ？（补充）*
## 生命周期的变化
整体来看，变化不大，只是名字大部分需要 + on，功能上类似。
使用上 Vue3 组合式 API 需要先引入；Vue2 选项 API 则可直接调用。
常用生命周期表格如下所示:
          ```js
          Vue2.x	        Vue3
          beforeCreate	  Not needed*
          created	        Not needed*
          beforeMount	    onBeforeMount
          mounted	        onMounted
          beforeUpdate	  onBeforeUpdate
          updated	        onUpdated
          beforeDestroy	  onBeforeUnmount
          destroyed	      onUnmounted
          ```
Tips： setup是围绕beforeCreate和created生命周期钩子运行的，所以不需要显式地去定义。

## 多根节点
Vue3 支持了多根节点组件，也就是fragment。
Vue2中，编写页面的时候，我们需要去将组件包裹在<div>中，否则报错警告。
```js
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```
Vue3，我们可以组件包含多个根节点，可以少写一层，niceeee ！
```js
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```


## 组合式API
Vue2 是 选项式API（Option API），一个逻辑会散乱在文件不同位置（data、props、computed、watch、生命周期函数等），导致代码的可读性变差，需要上下来回跳转文件位置。Vue3 组合式API（Composition API）则很好地解决了这个问题，可将同一逻辑的内容写到一起。

## 响应式原理
Vue2 响应式原理基础是Object.defineProperty；Vue3 响应式原理基础是Proxy。

搬运 Vue2 核心源码，略删减。
```js
function defineReactive(obj, key, val) {
  // 一 key 一个 dep
  const dep = new Dep()
  
  // 获取 key 的属性描述符，发现它是不可配置对象的话直接 return
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) { return }
  
  // 获取 getter 和 setter，并获取 val 值
  const getter = property && property.get
  const setter = property && property.set
  if((!getter || setter) && arguments.length === 2) { val = obj[key] }
  
  // 递归处理，保证对象中所有 key 被观察
  let childOb = observe(val)
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // get 劫持 obj[key] 的 进行依赖收集
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if(Dep.target) {
        // 依赖收集
        dep.depend()
        if(childOb) {
          // 针对嵌套对象，依赖收集
          childOb.dep.depend()
          // 触发数组响应式
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
    }
    return value
  })
  // set 派发更新 obj[key]
  set: function reactiveSetter(newVal) {
    ...
    if(setter) {
      setter.call(obj, newVal)
    } else {
      val = newVal
    }
    // 新值设置响应式
    childOb = observe(val)
    // 依赖通知更新
    dep.notify()
  }
}
```
那 Vue3 为何会抛弃它呢？那肯定是有一些缺陷的。

主要原因：无法监听对象或数组新增、删除的元素。
Vue2 方案：针对常用数组原型方法push、pop、shift、unshift、splice、sort、reverse进行了hack处理；提供Vue.set监听对象/数组新增属性。对象的新增/删除响应，还可以new个新对象，新增则合并新属性和旧对象；删除则将删除属性后的对象深拷贝给新对象。

Tips： Object.defineOProperty是可以监听数组已有元素，但 Vue2 没有提供的原因是性能问题。

Proxy
Proxy是ES6新特性，通过第2个参数handler拦截目标对象的行为。相较于Object.defineProperty提供语言全范围的响应能力，消除了局限性。但在兼容性上放弃了（IE11以下）

局限性
对象/数组的新增、删除。
监测.length修改。
Map、Set、WeakMap、WeakSet的支持。
基本用法：创建对象的代理，从而实现基本操作的拦截和自定义操作。
```js
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : ''
  },
  set: function() {},
  ...
}
```
搬运 Vue3 的源码 reactive.ts 文件
```js
function createReactiveObject(target, isReadOnly, baseHandlers, collectionHandlers, proxyMap) {
  ...
  // collectionHandlers: 处理Map、Set、WeakMap、WeakSet
  // baseHandlers: 处理数组、对象
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy)
  return proxy
}
```
以 baseHandlers.ts 为例，使用Reflect.get而不是target[key]的原因是receiver参数可以把this指向getter调用时，而非Proxy构造时的对象。
```js
// 依赖收集
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    ...
    // 数组类型
    const targetIsArray = isArray(target)
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }
    // 非数组类型
    const res = Reflect.get(target, key, receiver);
    
    // 对象递归调用
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
// 派发更新
function createSetter() {
  return function set(target: Target, key: string | symbol, value: unknown, receiver: Object) {
    value = toRaw(value)
    oldValue = target[key]
    // 因 ref 数据在 set value 时就已 trigger 依赖了，所以直接赋值 return 即可
    if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
      oldValue.value = value
      return true
    }

    // 对象是否有 key 有 key set，无 key add
    const hadKey = hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)
    
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}
```

## 虚拟DOM
Vue3 相比于 Vue2 虚拟DOM 上增加patchFlag字段。

注意第 3 个_createElementVNode的第 4 个参数即patchFlag字段类型，字段类型情况如下所示。1 代表节点为动态文本节点，那在 diff 过程中，只需比对文本对容，无需关注 class、style等。除此之外，发现所有的静态节点，都保存为一个变量进行静态提升，可在重新渲染时直接引用，无需重新创建。
```js
export const enum PatchFlags { 
  TEXT = 1, // 动态文本内容
  CLASS = 1 << 1, // 动态类名
  STYLE = 1 << 2, // 动态样式
  PROPS = 1 << 3, // 动态属性，不包含类名和样式
  FULL_PROPS = 1 << 4, // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5, // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7, // 带有 key 属性的 fragment 或部分子节点
  UNKEYED_FRAGMENT = 1 << 8,  // 子节点没有 key 的fragment
  NEED_PATCH = 1 << 9, // 只会进行非 props 的比较
  DYNAMIC_SLOTS = 1 << 10, // 动态的插槽
  HOISTED = -1,  // 静态节点，diff阶段忽略其子节点
  BAIL = -2 // 代表 diff 应该结束
}
```

## 事件缓存
Vue3 的 cacheHandler可在第一次渲染后缓存我们的事件。相比于 Vue2 无需每次渲染都传递一个新函数。加一个click事件。

## Diff 优化
搬运 Vue3 patchChildren 源码。结合上文与源码，patchFlag帮助 diff 时区分静态节点，以及不同类型的动态节点。一定程度地减少节点本身及其属性的比对。

## 打包优化(tree-shaking)
tree-shaking：模块打包webpack、rollup等中的概念。移除 JavaScript 上下文中未引用的代码。主要依赖于import和export语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。

以nextTick为例子，在 Vue2 中，全局 API 暴露在 Vue 实例上，即使未使用，也无法通过tree-shaking进行消除。
```js
import Vue from 'vue'

Vue.nextTick(() => {
  // 一些和DOM有关的东西
})
```
Vue3 中针对全局 和内部的API进行了重构，并考虑到tree-shaking的支持。因此，全局 API 现在只能作为ES模块构建的命名导出进行访问。
```js
import { nextTick } from 'vue'

nextTick(() => {
  // 一些和DOM有关的东西
})
```
通过这一更改，只要模块绑定器支持tree-shaking，则 Vue 应用程序中未使用的api将从最终的捆绑包中消除，获得最佳文件大小。受此更改影响的全局API有如下。
```js
Vue.nextTick
Vue.observable （用 Vue.reactive 替换）
Vue.version
Vue.compile （仅全构建）
Vue.set （仅兼容构建）
Vue.delete （仅兼容构建）
内部 API 也有诸如 transition、v-model等标签或者指令被命名导出。只有在程序真正使用才会被捆绑打包。

根据 尤大 直播可以知道如今 Vue3 将所有运行功能打包也只有22.5kb，比 Vue2 轻量很多。
```

## 自定义渲染API
Vue3 提供的createApp默认是将 template 映射成 html。但若想生成canvas时，就需要使用custom renderer api自定义render生成函数。
```js
// 自定义runtime-render函数
import { createApp } from './runtime-render'
import App from './src/App'

createApp(App).mount('#app')
```

## TypeScript 支持
Vue3 由TS重写，相对于 Vue2 有更好地TypeScript支持。

Vue2 Option API中 option 是个简单对象，而TS是一种类型系统，面向对象的语法，不是特别匹配。
Vue2 需要vue-class-component强化vue原生组件，也需要vue-property-decorator增加更多结合Vue特性的装饰器，写法比较繁琐。

# 51.Vue解决 scoped（deep选择器）
Scoped扩展知识（使用了 postcss 对代码进行修改，为元素添加一个 data-xxxx 的hash 来区分元素不重复）
好处：当使用Scoped时，父组件的样式不会泄露到子组件中。
但是，一个子组件的根节点还是会被父组件的scoped css 和自组件的 scoped css 影响。

·Vue2中
1. 使用Sass等预处理器： ::v-deep
2. 不使用预处理器：     >>>

·Vue3中（前缀::v- 现在已经被弃用，不论是否使用了Sass等预处理器，都可以只使用统一的 :deep 选择器，不过现在推荐使用带括号的选择器）
::deep(.child-class){
  background-color:#000
}


# 52.Vue3.2 中的 **Setup 语法糖**

## vue3.2 到底更新了什么？
更新的内容主要有以下 5 块：
1.SSR：服务端渲染优化。
      @vue/server-renderer包加了一个ES模块创建，与Node.js解耦，使在非Node环境用@vue/serve-render做服务端渲染成为可能，比如(Workers、Service Workers)
2.New SFC Features：新的单文件组件特性
3.Web Components：自定义 web 组件。
4.Effect Scope API：effect 作用域，
      用来直接控制响应式副作用的释放时间(computed 和 watchers)。
      这是底层库的更新，开发不用关心，但是应该知道
5.Performance Improvements：性能提升。这是内部的提升，跟开发无关

## setup 介绍
1.组件只需引入不用注册，属性和方法也不用返回，也不用写setup函数，也不用写export default ，自定义指令也可以在我们的template中自动获得。

### **变量、方法不需要 return 出来**
```vue
<template>
  <div class="home">
    显示的值{{flag }}
    <button @click="changeHander">改变值</button>
  </div>
</template>
<!-- 只需要在script上添加setup -->
<script lang="ts" setup>
    import { ref } from 'vue';

    <!-- flag变量不需要在 return出去了 -->
    let flag=ref("开端-第一次循环")

    <!-- 函数也可以直接引用,不用在return中返回 -->
    let changeHander=():void=>{
        flag.value='开端-第二次循环'
    }

</script>
```

### **组件不需要在注册**
```vue
<!-- 这个是组件 -->
<template>
    <div>
        <h2> 你好-我是肖鹤云</h2>
    </div>
</template>
```

使用的页面
```vue
<template>
  <div class="home">
    <test-com></test-com>
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册!
//在使用的使用直接是小写和横杠的方式连接 test-com
import TestCom from "../components/TestCom.vue"
</script>
```

### **分析引入 setup 后组件的变化**
在 script setup 中，
引入的组件可以直接使用无需再通过components进行注册
并且无法指定当前组件的名字，它会自动以文件名为主，也就是不用再写name属性了。


### **新增 defineProps 接受父组件传递过来的值**
父组件传递参数
```vue
<template>
  <div class="home">
    <test-com :info="msg" time="42分钟"></test-com>
  </div>
</template>
<script lang="ts" setup>

import TestCom from "../components/TestCom.vue"
let msg='公交车-第一次循环'
</script>
```
子组件接受参数
```vue
<template>
    <div>
        <h2> 你好-我是肖鹤云</h2>
        <p>信息:{{ info}}</p>
        <p>{{ time }}</p>
    </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
defineProps({
    info:{
        type:String,
        default:'----'
    },
    time:{
        type:String,
        default:'0分钟'
    },
})
</script>
```

### **子组件使用 defineEmits 向组件抛出事件**
```vue
<template>
    <div>
        <h2> 你好-我是肖鹤云</h2>
        <button @click="hander1Click">新增</button>
        <button @click="hander2Click">删除</button>
    </div>
</template>

<script lang="ts" setup>
 import {defineEmits} from 'vue'
//  使用defineEmits创建名称，接受一个数组
let $myemit=defineEmits(['myAdd','myDel'])
let hander1Click=():void=>{
    $myemit('myAdd','新增的数据')
}

let hander2Click=():void=>{
    $myemit('myDel','删除的数据')
}
</script>
```

父组件
```vue
<template>
  <div class="home">
    <test-com @myAdd="myAddHander" @myDel='myDelHander'></test-com>
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册，是不是爽歪歪呀!
//在使用的使用直接是小写和横杠的方式连接 test-com
import TestCom from "../components/TestCom.vue"
let myAddHander=(mess):void=>{
  console.log('新增==>',mess);
}

let myDelHander=(mess):void=>{
  console.log('删除==>', mess);
}
</script>
```

### **如何获取子组件中的属性值**
子组件
```vue
<template>
    <div>
        <h2> 你好-我是肖鹤云</h2>
        <p>性别:{{ sex}}</p>
        <p>其他信息:{{ info}}</p>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,defineExpose } from "vue";
let sex=ref('男')
let info=reactive({
    like:'喜欢李诗晴',
    age:27
})
// 将组件中的属性暴露出去，这样父组件可以获取
defineExpose({
    sex,
    info
})
</script>
```

父组件
```vue
<template>
  <div class="home">
    <test-com @myAdd="myAddHander" @myDel='myDelHander' ref="testcomRef"></test-com>
    <button @click="getSonHander">获取子组件中的数据</button>
  </div>
</template>
<script lang="ts" setup>
import TestCom from "../components/TestCom.vue"
import {ref} from 'vue'
const testcomRef = ref()
const getSonHander=()=>{
  console.log('获取子组件中的性别', testcomRef.value.sex );
  console.log('获取子组件中的其他信息', testcomRef.value.info );
}
</script>
```

### **新增指令 v-memo**
v-memo 会记住一个模板的子树,元素和组件上都可以使用。
该指令接收一个固定长度的数组作为依赖值进行[记忆比对]。
如果数组中的每个值都和上次渲染的时候相同，则整个子树的更新会被跳过。
即使是虚拟 DOM 的 VNode 创建也将被跳过，因为子树的记忆副本可以被重用。
因此渲染的速度会非常的快。
需要注意得是:正确地声明记忆数组是很重要。
开发者有责任指定正确的依赖数组，以避免必要的更新被跳过。
<li v-for="item in listArr"  :key="item.id"  v-memo="['valueA'，'valueB']">
    {{ item.name   }}
</li>
v-memo 的指令使用较少，它的作用是:缓存模板中的一部分数据。
只创建一次，以后就不会再更新了。也就是说用内存换取时间。

### style v-bind 
可以在style中去使用变量。是不是感觉很牛逼呀！
style v-bind将span变成红色
```vue
<template>
  <span> 有开始循环了-开端 </span>  
</template>
<script setup>
  import { reactive } from 'vue'
  const state = reactive({
    color: 'red'
  })
</script>
<style scoped>
  span {
    /* 使用v-bind绑定state中的变量 */
    color: v-bind('state.color');
  }  
</style>
```


# **200 性能优化!!!**
## 0.Vue3 虚拟DOM增加 patchFlag 字段
Vue3 相比于 Vue2 虚拟DOM 上增加 patchFlag 字段。

注意第 3 个_createElementVNode的第 4 个参数即patchFlag字段类型，字段类型情况如下所示。1 代表节点为动态文本节点，那在 diff 过程中，只需比对文本对容，无需关注 class、style等。除此之外，发现所有的静态节点，都保存为一个变量进行静态提升，可在重新渲染时直接引用，无需重新创建。
```js
export const enum PatchFlags { 
  TEXT = 1, // 动态文本内容
  CLASS = 1 << 1, // 动态类名
  STYLE = 1 << 2, // 动态样式
  PROPS = 1 << 3, // 动态属性，不包含类名和样式
  FULL_PROPS = 1 << 4, // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5, // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7, // 带有 key 属性的 fragment 或部分子节点
  UNKEYED_FRAGMENT = 1 << 8,  // 子节点没有 key 的fragment
  NEED_PATCH = 1 << 9, // 只会进行非 props 的比较
  DYNAMIC_SLOTS = 1 << 10, // 动态的插槽
  HOISTED = -1,  // 静态节点，diff阶段忽略其子节点
  BAIL = -2 // 代表 diff 应该结束
}
```

## 1.合理的选择 v-if 和 v-show

## 2. v-for 和 v-if 不要一起使用（仅限于Vue2，Vue3已经自动优化）
此优化技巧仅限于Vue2，Vue3 中对 v-for 和 v-if 的优先级做了调整

## 3. v-for 遍历必须为 item 添加 key
使用key的注意事项：
1.不要使用可能重复的或者可能变化 key 值
2.如果数组中的数据有状态需要维持时（例如输入框），不要使用数组的 index 作为 key 值，因为如果在数组中插入或者移除一个元素时，其后面的元素 index 将会变化，这回让vue进行原地复用时错误的绑定状态。
3.如果数组中没有唯一的 key值可用，且数组更新时不是全量更新而是采用类似push，splice来插入或者移除数据时，可以考虑对其添加一个 key 字段，值为 Symbol() 即可保证唯一。
4.当我们渲染的数据不需要保持状态时，例如常见的单纯的表格分页渲染（不包含输入，只是展示）、下拉加载更多等场景，那么使用 index 作为 key 再好不过，因为进入下一页或者上一页时就会原地复用之前的节点，而不是重新创建，如果使用唯一的 id 作为 key 反而会重新创建dom，性能相对较低。
5.使用 index 作为 key ,尽量避免对数组的中间进行 增加/删除 等会影响后面元素key变化的操作。这会让 vue 认为后面所有元素都发生了变化，导致多余的对比和原地复用。
### 所以使用 index 作为 key 需要满足：
数据没有独立的状态
数据不会进行 增加/删除 等会影响后面元素key变化的操作
无法使用 index 作为 key 的时候,使用 id 作为 key


## 4. v-if/v-else-if/v-else 中使用 key
原因：默认情况下，Vue 会尽可能高效的更新 DOM。这意味着其在相同类型的元素之间切换时，会修补已存在的元素，而不是将旧的元素移除然后在同一位置添加一个新元素。如果本不相同的元素被识别为相同，则会出现意料之外的副作用。
如果只有一个 v-if ，没有 v-else 或者 v-if-else的话，就没有必要加 key 了。



## 5.使用局部变量
优化前
```js
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
import { heavy } from '@/utils'

export default {
  props: ['start'],
  computed: {
    base () { return 42 },
    result () {
      let result = this.start
      for (let i = 0; i < 1000; i++) {
        result += heavy(this.base)
      }
      return result
    }
  }
}
</script>
```
优化后
```js
<template>
  <div :style="{ opacity: start / 300 }">
    {{ result }}</div>
</template>

<script>
import { heavy } from '@/utils'

export default {
  props: ['start'],
  computed: {
    base () { return 42 },
    result () {
      const base = this.base
      let result = this.start
      for (let i = 0; i < 1000; i++) {
        result += heavy(base)
      }
      return result
    }
  }
}
</script>
```
这里主要是优化前后的组件的计算属性 result 的实现差异，优化前的组件多次在计算过程中访问 this.base，而优化后的组件会在计算前先用局部变量 base，缓存 this.base，后面直接访问 base。

那么为啥这个差异会造成性能上的差异呢，原因是你每次访问 this.base 的时候，由于 this.base 是一个响应式对象，所以会触发它的 getter，进而会执行依赖收集相关逻辑代码。类似的逻辑执行多了，像示例这样，几百次循环更新几百个组件，每个组件触发 computed 重新计算，然后又多次执行依赖收集相关逻辑，性能自然就下降了。

从需求上来说，this.base 执行一次依赖收集就够了，把它的 getter 求值结果返回给局部变量 base，后续再次访问 base 的时候就不会触发 getter，也不会走依赖收集的逻辑了，性能自然就得到了提升。

## 6.使用 KeepAlive
在一些渲染成本比较高的组件需要被经常切换时，可以使用 keep-alive 来缓存这个组件

而在使用 keep-alive 后，被 keep-alive 包裹的组件在经过第一次渲染后，的 vnode 以及 DOM 都会被缓存起来，然后再下一次再次渲染该组件的时候，直接从缓存中拿到对应的 vnode 和 DOM，然后渲染，并不需要再走一次组件初始化，render 和 patch 等一系列流程，减少了 script 的执行时间，性能更好。

*注意*： 滥用 keep-alive 只会让你的应用变得更加卡顿，因为他会长期占用较大的内存

## 7.1.路由懒加载

## 7.2.组件懒加载
在单页应用中，如果没有应用懒加载，运用 webpack 打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，延时过长，不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。

## 7.3.图片懒加载
图片懒加载：适用于页面上有较多图片且并不是所有图片都在一屏中展示的情况，vue-lazyload 插件给我们提供了一个很方便的图片懒加载指令 v-lazy

但是并不是所有图片都适合使用懒加载，例如 banner、相册等 更加推荐使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。

## 8. 长列表性能优化
  Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 *Object.freeze* 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。
  ```js
  export default {
  data: () => ({
    users: {}
  }),

  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
  ```

## 9. vue 组件中的 data 是函数而不是对象
当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例，复用在多个页面。

如果 data 是一个纯碎的对象，则所有的实例将共享引用同一份 data 数据对象，无论在哪个组件实例中修改 data，都会影响到所有的组件实例。
如果 data 是函数，每次创建一个新实例后，调用 data 函数，从而返回初始数据的一个全新副本数据对象。这样每复用一次组件，会返回一份新的 data 数据，类似于给每个组件实例创建一个私有的数据空间，让各个组件的实例各自独立，互不影响保持低耦合。

## 10. Vue 钩子函数之钩子事件 hookEvent,监听组件简化代码(仅限，vue3有改变)
用法：
通过 $on(eventName, eventHandler) 侦听一个事件；
通过 $once(eventName,eventHandler) 一次性侦听一个事件；
通过 $off(eventName, eventHandler) 停止侦听一个事件；

  通常实现一个定时器的调用与销毁我可能会以以下方式实现：
```js
export default{
  data(){
    timer:null  // 需要创建实例
  },

  mounted(){
      this.timer = setInterval(()=>{
      //具体执行内容
      console.log('1');
    },1000);
  }

  beforeDestory(){
    clearInterval(this.timer);
    this.timer = null;
  }
}
```
这种方法存在的问题是：
vue 实例中需要有这个定时器的实例，感觉有点多余。创建的定时器代码和销毁定时器的代码没有放在一起，不容易维护，通常很容易忘记去清理这个定时器。
使用  监听beforeDestory生命周期可以避免该问题，并且因为只需要监听一次，所以使用 $once 进行注册监听。
```js
export default{
  methods:{
    fn(){
      const timer = setInterval(()=>{
        console.log('1');
      },1000);

      this.$once('hook:beforeDestory',()=>{ // 监听一次即可
        clearInterval(timer);
        timer = null;
      })
    }
  }
}
```



## 11. 非响应式数据
初始化时，vue 会对 data 做 getter、setter 改造。在 Vue 的文档中介绍数据绑定和响应时，特意标注了对于经过 Object.freeze() 方法的对象无法进行更新响应
  使用了 Object.freeze()之后，减少了 observer 的开销。
  
## 12. 不要将所有的数据都放到 data 中
data 中的数据都会增加 getter 和 setter，又会收集 watcher，这样还占内存。不需要响应式的数据我们可以定义在实例上。



## 13. v-for元素绑定事件代理
事件代理作用主要是 2 个：
1.将事件处理程序代理到父节点，减少内存占用率
2.动态生成子节点时能自动绑定事件处理程序到父节点

## 14. 函数式组件
函数式组件是无状态，它无法实例化，没有任何的生命周期和方法。创建函数式组件也很简单，只需要在模板添加 functional 声明即可。一般适合只依赖于外部数据的变化而变化的组件，因其轻量，渲染性能也会有所提高。

## 15. provide 和 inject 组件通信
痛点：常用的父子组件通信方式都是父组件绑定要传递给子组件的数据，子组件通过 props 属性接收，一旦组件层级变多时，采用这种方式一级一级传递值非常麻烦，而且代码可读性不高，不便后期维护。

vue 提供了 provide 和 inject 帮助我们解决多层次嵌套嵌套通信问题。在 provide 中指定要传递给子孙组件的数据，子孙组件通过 inject 注入祖父组件传递过来的数据，可以轻松实现跨级访问父组件的数据。

provide：是一个对象，或者是一个返回对象的函数。里面呢就包含要给子孙后代的东西，也就是属性和属性值。注意：子孙层的 provide 会掩盖祖父层 provide 中相同 key 的属性值。

inject：一个字符串数组，或者是一个对象。属性值可以是一个对象，包含 from 和 default 默认值，from 是在可用的注入内容中搜索用的 key (字符串或 Symbol)，意思就是祖父多层 provide 提供了很多数据， from 属性指定取哪一个 key default 指定默认值。
```js
-------------------parent.vue----------------------
provide(){
    return {
   // keyName: {name:this.name}, // value 是对象才能实现响应式，也就是引用类型
      keyName: this.changeValue // 通过函数的方式也可以[注意，这里是把函数作为value，而不是this.changeValue()]
   // keyName: 'test' value 如果是基本类型，就无法实现响应式
    }
  }
```
```js
inject:['keyName']
  create(){
     console.log(this.keyName) // 改变后的名字-李四
}
```


  ### b. slot 编译优化
Vue.js 2.x 中，如果有一个组件传入了 slot，那么每次父组件更新的时候，会强制使子组
件 update，造成性能的浪费。
Vue.js 3.0 优化了 slot 的生成，使得非动态 slot 中属性的更新只会触发子组件的更新。
动态 slot 指的是在 slot 上面使用 v-if，v-for，动态 slot 名字等会导致 slot 产生运行时动
态变化但是又无法被子组件 track 的操作。
c. diff 算法优化

## 16.事件的销毁
当一个组件被销毁时，我们应该清除组件中添加的 全局事件 和 定时器 等来防止内存泄漏

## 17.Vue打包优化方面
### 一、体积优化
1.压缩打包代码: webpack 和 vite 的生产环境打包默认就会压缩你的代码，这个一般不需要特殊处理，webpack 也可以通过对应的压缩插件手动实现
2.取消 source-map: 可以查看你的打包产物中是否有 .map 文件，如果有你可以将 source-map 的值设置为false或者空来关闭代码映射（这个占用的体积是真的大）
3.打包启用 gizp 压缩: 这个需要服务器也开启允许 gizp 传输，不然启用了也没啥用（ webpack 有对应的 gzip 压缩插件，不同版本的 webpack 压缩插件可能不同，建议先到官网查询）

### 二、代码分割
代码分割的作用的将打包产物分割为一个一个的小产物，其依赖 esModule。所以当你使用 import() 函数来导入一个文件或者依赖，那么这个文件或者依赖就会被单独打包为一个小产物。路由懒加载 和 异步组件 都是使用这个原理。

### 三、路由懒加载
异步组件
对于 UI库 我一般不会使用按需加载组件，而是比较喜欢 CDN 引入的方式来优化。

### 四、网络（CDN、gzip、缓存...）
*CDN：* 开发阶段使用本地库(node_module)，通过配置 外部扩展(Externals) 打包时来排除这些依赖。然后在 html 文件中通过 CDN 的方式来引入它们
好处：
·减少应用打包出来的包体积
·加快静态资源的访问
·利用浏览器缓存，不会变动的文件长期缓存


*Server Push：* HTTP2已经相对成熟了；经过上面的 CDN 引入，我们可以对网站使用 HTTP2 的 Server Push 功能来让浏览器提前加载 这些 CDN 和 其他文件。

*开启 gzip：* 这个上面已经说过了，其原理就是当客户端和服务端都支持 gzip 传输时，服务端会优先发送经过 gzip 压缩过的文件，然后客户端接收到在进行解压。

*开启缓存：* 一般我使用的是协商缓存，但是这并不适用于所有情况，例如对于使用了 Server Push 的文件，就不能随意的修改其文件名。所以我一般还会将生产的主要文件固定文件名

### 五、分析包大小
终端中运行 npm run preview -- --report, 这个命令会从我们的入口main.js进行依赖分析，分析出各个包的大小。最终会在生成的dist文件夹下生成一个report.html的文件，打开后就可以看到我们在项目使用文件占据的空间大小

### 六、webpack配置排除打包
找到 vue.config.js， 添加 externals 项，具体如下：
```js
configureWebpack: {
  // 配置单页应用程序的页面的标题
  name: name,
  externals: {
     /**
      * externals 对象属性解析。
      *  基本格式：
      *     '包名' : '在项目中引入的名字'
      *  
    */
    'vue': 'Vue',
    'element-ui': 'ElementUI',
    'xlsx': 'XLSX'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
```


```js
在vue.config.js文件中:
let externals = {}
let cdn = { css: [], js: [] }
const isProduction = process.env.NODE_ENV === 'production' // 判断是否是生产环境
if (isProduction) {
  externals = {
      /**
      * externals 对象属性解析：
      * '包名' : '在项目中引入的名字'
    */
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'xlsx': 'XLSX'
  }
  cdn = {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css' // element-ui css 样式表
    ],
    js: [
      // vue must at first!
      'https://unpkg.com/vue@2.6.12/dist/vue.js', // vuejs
      'https://unpkg.com/element-ui/lib/index.js', // element-ui js
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js', // xlsx
    ]
  }
}

webpack配置externals配置项
configureWebpack: {
  // 配置单页应用程序的页面的标题
  name: name,
  externals: externals,
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}

通过 html-webpack-plugin注入到 index.html之中:
在vue.config.js文件中配置:
chainWebpack(config) {
  config.plugin('preload').tap(() => [
    {
      rel: 'preload',
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }
  ])
  // 注入cdn变量 (打包时会执行)
  config.plugin('html').tap(args => {
    args[0].cdn = cdn // 配置cdn给插件
    return args
  })
  // 省略其他...
}

找到 public/index.html   通过配置CDN Config 依次注入 css 和 js。
修改head的内容如下:
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= webpackConfig.name %></title>

      <!-- 引入样式 -->
      <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
        <link rel="stylesheet" href="<%=css%>">
        <% } %>


    <!-- 引入JS -->
    <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%=js%>"></script>
    <% } %>
  </head>

```









## 五、 打包去除console.log

# ·················技巧····································

# 101.Vue路由组件化(运用require.context)
```js
require.context(directory, useSubdirectories = false, regExp = /^.//)
第一个参数目标文件夹
是否查找子集 true | false
正则匹配
```
  ## 主路由文件中代码
```js
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routerList = [];
function importAll(r) {
    r.keys().forEach((key) => {
        routerList.push(r(key).default);
    });
}
、
importAll(require.context("./", true, /\.routes\.js/));//这里的目录和规则可以看自己习惯，这里获取的是当前同一个文件夹下的所有以 .routes.js 结尾的各个不同功能路由模块文件

const routes = [
    ...routerList,
    {
      path: './',
      name: 'Home',
      component: Home
    }
];

const router = new VueRouter({
    routes,
});

export default router;
```
  ## 各个模块路由文件
```js
export default {
  path:'./login',
  name:'./login',
  component
  children:[

  ]
}
```

# 102.Vue 权限控制技巧
1.单独一个文件保存权限判断函数
```js
export function checkArray (key){
  //权限数组
  let arr = [1, 2, 3 ,4]
  let index = arr.indexOf(key)
  if( index > -1 ){
    return true
  }else{
    return false
  }
}
```

2.在 main.js 中定义一个自定义指令
```js
import {checkArray} from '../..'
Vue.directive('display-key',{
  inserted(el, binding){
    let displayKey = binding.value
    if( displayKey ){
      //使用函数判断是否有权限，返回 true 或 false
      let hasPermissin = checkArray(displayKey)
      if(!hasPermissin){
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need v-display-key`)
    }
  }
})
```
3. 在各个组件中可以在组件标签上使用指令
```js
//有1,2,3,4的都是有权限的，超过4的没有权限会删除
<button v-display-key='1'>按钮一</button>
<button v-display-key='2'>按钮一</button>
```

