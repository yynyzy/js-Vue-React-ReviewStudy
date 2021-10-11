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
  ## vue2.x的响应式
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

  ## vue3.0的响应式
·实现原理:
·通过Proxy (代理)︰拦截对象中任意属性的变化,包括:属性值的读写、属性的添加、属性的删除等。
·通过Reflect(反射)︰对被代理对象的属性进行操作。
·MDN文档中描述的Proxy与Reflect:
```
   const p = new Proxy(obj, {
     //target就是obj key就是要取obj里面的哪个属性
       get(target,propName) {
               return Reflect.get(target,propName);
           },
       set(target,propName,newval) {
         return Reflect.set(target,propName, newval);

           }
   })
```

  ## 面试回答 Vue2完整响应式原理
1.有这样三个关键角色：(Observer,Watcher,Dep)
  ·Observer: 
    1.在数据初始化时，vue会将 data选项转换成 Observer 对象。
    2.Observer 会遍历对象的属性。多层对象是通过递归来实现。数组类型，通过重写数组方法来实现。
    3.通过调用 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持。
    

  ·Watcher: 观察者对象 ,执⾏更新函数（更新dom）
  实例分为渲染 watcher (render watcher),计算属性 watcher (computed  watcher),侦听器 watcher（user watcher）三种

  ·Dep: 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个Dep实例, 当数据有变更时,setter 里面会触发 dep.notify() 通知各个watcher去改动。


![vue2响应式](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\vue2响应式.png)


  ## 核心实现
```
/**
 * @name Vue数据双向绑定（响应式系统）的实现原理
 */

  <script>

        function observer(target) {
            if (!target && typeof target !== 'object') {
                return
            }
            Object.keys(target).forEach((k) => {
                defineReactive(target, key, target[k])
            })
        }

        function defineReactive(target, key, val) {
            // 递归响应，处理嵌套对象
            observer(val)

            // 创建Dep实例： Dep和key一对一对应
            const dep = new Dep()

            Object.defineProperty(obj, key, {
                get() {
                    //收集依赖
                    Dep.target && dep.addSub(Dep.target)
                    return val
                },
                set(newV) {
                    if (val !== newV) {
                        //传入的新值可能是对象，需要遍历
                        observe(newV)
                        val = newV
                        dep.notify()
                    }
                }
            })
        }

        // Dep: 管理若干watcher实例，它和key一对一关系
        class Dep {
            constructor() {
                this.subs = []
            }
            addSub(sub) {

                this.subs.push(sub)
            }
            notify(val) {
                this.subs.forEach((sub) => {
                    sub.update()
                })
            }
        }

        // 实现update函数可以更新
        class Watcher {
            constructor(vm, key, cb) {
                // this.vm = vm
                // this.key = key
                // this.cb = cb

                // 将当前实例指向Dep.target
                Dep.target = this
                // this.vm[this.key]
                // Dep.target = null
            }

            update() {
                console.log(`${this.key}属性更新了`)
                // this.cb(this.vm.$data[this.key])
            }
        }
        //new Watcher(this, 'test')  //对当前的组件创建一个watcher 用于更新
        //observe(vue.$data)        

    </script>
```

# 5.watchEffect 和 watch 的区别
## 1.watch侦听器
  对基本数据类型进行监听----- watch特性：
  1.具有一定的惰性lazy 第一次页面展示的时候不会执行，只有数据变化的时候才会执行 
  2.参数可以拿到当前值和原始值 
  3.可以侦听多个数据的变化，用一个侦听器承载
  4.如果监听rective对象中的属性,必须通过函数来指定,如果监听多个数据,需要使用数组来指定。

```
watch (
  prop,             //如果监听的是一个对象，第一个参数传入回调  ()=>{obj.prop} 
  (newValue, oldValue) => {
      console.log(newValue, oldValue);
  },{
    immediate:true, //默认初始时不执行回调，通过配置immediate未true，来指定初始时立即执行
    deep:true       //通过配置deep为true，来指定深度监听。
  })监听新旧属性
```

侦听器还可以使用数组以同时侦听多个源：
```
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
}
```

## 2.watchEffect
  1.立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
  2.立即执行，没有惰性，页面的首次加载就会执行。
  3.不需要传递要侦听的内容,只要传递一个回调函数
  4.不能获取之前数据的值 只能获取当前值
  5.一些异步的操作放在这里会更加合适
```
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

# 7.component中的 is
Props：
  is - string | Component
用法：
渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。is 的值是一个字符串，它既可以是 HTML 标签名称也可以是组件名称。
```
<!--  动态组件由 vm 实例的 `componentId` property 控制 -->
<component :is="componentId"></component>

<!-- 也能够渲染注册过的组件或 prop 传入的组件-->
<component :is="$options.components.child"></component>

<!-- 可以通过字符串引用组件 -->
<component :is="condition ? 'FooComponent' : 'BarComponent'"></component>

<!-- 可以用来渲染原生 HTML 元素 -->
<component :is="href ? 'a' : 'span'"></component>
```

# 8.setup的两个注意点
.setup执行的时机
    在beforeCreate之前执行一次，this是undefined。
.setup的参数(props,context):

  1.props:值为对象，包含:组件外部传递过来，且组件内部声明接收了的属性。
    setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。
```
    export default {
      props: {
        title: String
      },
      setup(props) {
        console.log(props.title)
      }
    }
```
    WARNING!!!   因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
    如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作：

```
    import { toRefs } from 'vue'
    setup(props) {
      const { title } = toRefs(props)
      console.log(title.value)
    }
```

  2.context:上下文对象(context 是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值：)
      ·attrs:值为对象，包含:组件外部传递过来，但没有在props配置中声明的属性,相当于 this.$attrs.
      ·slots:收到的插槽内容,相当于this.$slots 。
      ·emit:分发自定义事件的函数,相当于this.$emit。
```
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
```
      export default {
        setup(props, { attrs, slots, emit, expose }) {
          ...
        }
      }
```

# 9.computed计算属性
·vue2单独一个computed:{} ，vue3中写法改变，变成一个组合式API，需要引入
```
import {computed} from 'vue'
setup(){
//计算属性—简写（没有考虑计算属性被修改的情况）
let fullName = computed(()=>{
return person.firstName + '-' + person. lastName
})
```

简单写法无法响应式，完整通过 get和set来变成响应式
```
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

# 11.toRef
·作用:创建一个ref 对象，其value值指向另一个对象宁的某个属性。
·语法: const name = toRef( person , 'name')
·应用:要将响应式对象中的某个属性单独提供给外部使用时。
·扩展: toRefs 与toRef功能一致，但可以批量创建多个ref对象，语法: toRefs(person)

# 12.vue不常用 composition API
 1. shallowReactive               //只对第一层响应式，深层次对象里面的不会改变
    shallowRef                    //只处理基本类型的响应式，不进行对象的响应式处理
    ·什么时候使用?
        ·如果有一个对象数据，结构比较深,但变化时只是外层属性变化===> shallowReactive。
        ·如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换===> shallowRef。

2.readonly 与shallowReadonly
    . readonly:让一个响应式数据变为只读的（深只读)。
    . shallowReadonly: 让一个响应式数据变为只读的(浅只读)。
    ·应用场景:不希望数据被修改时。
3.toRaw markRaw
    .toRaw:
      ·作用:将一个由reactive 生成的响应式对象转为普通对象。（ref没有）
      ·使用场景:用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
    .markRaw:
      ·作用:标记一个对象，使其永远不会再成为响应式对象。
      ·有些值不应该被设置为响应式对象，列入第三方库
4.customRef
    ·作用:创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制。
5.provide 与 inject
  父组件：provide('name',obj)
  孙组件: const myobj = inject('name')
6响应式数据的判断
· isRef:检查一个值是否为一个ref 对象
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
| vue.prototype   //挂载全局对象，在任意处可以调用 | app.config.globalProperties |


# 14. VUEX 模块化+命名空间 与 mapstate 等辅助函数的使用 
## 1.目的:让代码更好维护，让多种数据分类更加明确。
## 2.修改store.js
```
const countAbout = {
      namespaced:true,   //用辅助函数就得开开启命名空间
      state:{x:1},
      mutations: { ... },
      actions: { ... },
      getters: {
      bigSum(state){
      return state.sum* 10
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
```
  //方式一:自己直接读取
  this.$store.state.personAbout.list
  //方式二:借助mapState读取:
  ...mapState( 'countAbout' ,[ 'sum' , 'school' , 'subject' ])
```
## 4.开启命名空间后，组件中读取getters数据:
```
  //方式一:自己直接读取
  this.$store.getters [ 'personAbout/firstPersonName ' ]
  //方式二:借助mapGetters读取:
  ...mapGetters( 'countAbout',[ 'bigSum'])
```

## 5.开启命名空间后，组件中调用dispatch
```
  //方式一，自己直接dispatch
  this.$store.dispatch( ' personAbout/addPersonWang ' ,person)
  //方式二:借助mapActions:
  ...mapActions( 'countAbout' ,{incrementOdd: 'jiaodd' ,incrementWait: 'jiawait '})
```

## 6.开启命名空间后，组件中调用commit
  ```
  //方式一:自己直接commit
  this.$store.commit( " personAbout/ADD_PERSON ' , person)
  //方式二:借助 mapMutations:
  ...mapMutations( 'countAbout' ,{increment: '"IA' , decrement : ' JIAN'}),
  ```

# 15.ref 和 toRef 的区别
ref是对原始数据的拷贝，当修改ref数据时，模板中的视图会发生改变，但是原始数据并不会改变。
toRef是对原始数据的引用，修改toRef数据时，原始数据也会发生改变，但是视图并不会更新。

```
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
```
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
  ## 1. VUE2 的 filter过滤器 （Vue3 已经移除，推荐使用计算属性）
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


  ## 7.自定义指令（vue3的自定义指令里的生命周期与vue2的不同）
 注意：指令定义时不需要加v-, 使用时需要加 
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
```
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

    })
    ```
    如果想注册局部指令，组件中也接受一个 directives 的选项：
    ```
    directives: {
      focus: {
        // 指令的定义
        mounted(el,binding) {
          el.focus()
        }
      }
    }
```

# 17.跨域解决（代理转发，cors,JSONP）
## 代理转发
```
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
```
var express = require('express');
var app = express();
var Head = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(Head);
```
### 前端 配合(withCredentials: true)
```
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

# 18.VUE2全局事件总线(GlobalEventBus)
1.一种组件间通信的方式，适用于任意组件间通信。
2.安装全局事件总线:
new vue({
      ·····
      beforeCreate(){
      Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
      },
})
3.使用事件总线:
1.接收数据:A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。
methods(){
  demo(data){
    ......
    }
......
  mounted() {
  this.$bus.$on( 'xxxx' ,this.demo)
  }

2.提供数据:this.$bus.$emit( 'xxxx',数据)
4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

# 100.Vue2监视数据的原理及一些问题,Vue.set:
1.vue会监视data中所有层次的数据。
## 1.如何监测对象中的数据?
通过setter实现监视,且要在new Vue时就传入要监测的数据。
    (1).对象中后追加的属性，Vue默认不做响应式处理
    (2).如需给后添加的属性做响应式,请使用如下API:
              Vue.set(target, propertyName/index, value）或 
              vm.$set(target, propertyName/index,value)
## 2.如何监测数组中的数据?
通过包裹数组更新元素的方法实现,本质就是做了两件事:
      (1).调用原生对应的方法对数组进行更新。
      (2).重新解析模板，进而更新页面。
4.在Vue修改数组中的某个元素一定要用如下方法:
      1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
      2.Vue.set(）或vm.$set()


