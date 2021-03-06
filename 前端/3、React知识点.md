# 1.React路由
    //是H5的HistoryApi提供的路由
    const history = History.createHashHistory
    //是哈希路由，优点：兼容性好，不会造成页面刷新
    const history = History.createBrowserHistory

## 1.路由的基本使用
    1.明确好界面中的导航区、展示区
    2.导航区的a标签改为Link标签
 <Link to="/xxxxx">Demo</Link>
    3.展示区写Route标签进行路径的匹配
<Route path= '/xxxx'component={Demo}/>
    4.<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

## 2. BrowserRouter 和 HashRouter的区别
1.底层原理不一样:
    BrowserRouter使用的是*H5的 history API*不兼容IE9及以下版本。
    HashRouter使用的是URL的哈希值。
2.ur1表现形式不一样
    BrowserRouter的路径中没有#,例如: localhost: 30e0/demo/test
    HashRouter的路径包含#,例如: localhost:3000/#/demo/test
3.刷新后对路由state参数的影响
    (1).BrowserRouter没有任何影响，因为state保存在history对象中。
    (2).HashRouter刷新后会导致路由state参数的丢失。！！！！！！！！！！！！！！！
4.备注: HashRouter可以用于解决一些路径错误相关的问题。


## 3.路由组件与一般组件
    1.写法不同:
        一般组件: <Demo/ >
        路由组件: <Route path="/demo" component={Demo}/>
    2.存放位置不同:
        一般组件:components路由组件: pages
    3.接收到的props不同:
        一般组件:写组件标签时传递了什么，就能收到什么
        路由组件:接收到三个固定的属性：
                     history:
                        go: f go(n)
                        goBack: f goBack()
                        goForward: f goForward()
                        push: f push(path, state)
                        replace: f replace(path, state)
                    location:
                        pathname: "/about"
                        search: ""
                        state: undefined
                    match:
                        params: {}
                        path: "/about"
                        url: "/ about"

## 4.NavLink 与封装 NavLink
    1.NavLink 可以实现路由链接的高亮，通过 activeclassName 指定样式名
    2.标签体内容是一个特殊的标签属性
    3.通过 this.props.children 可以获取标签体内容

## 5.Switch的便用
    1.通常情况下，path和lcomponent是一一对应的关系。
    2.Switch可以提高路由匹配效率(单一匹配)。

## 6.解决多级路径刷新页面样式丢失的问题
    1.public/index.html 中引入样式时不写./ 写/（常用)
    2.public/index.html 中引入样式时不写./写%PUBLIC_URL%（常用)
    3.使用HashRouter

## 7.路由的严格匹配与模糊匹配
    1.默认使用的是模糊匹配（简单记:【输入的路径】必须包含要【匹配的路径】，且顺序要一致
    2.开启严格匹配:<Route exact={true} path="/about" component={About}/>
    3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## 8.Redirect的使用
    1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由2.具体编码:
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>

## 9.嵌套路由
    1.注册子路由时要写上父路由的path值
    2.路由的匹配是按照注册路由的顺序进行的

## 10.向路由组件传递 params 参数
    1.params参数
    路由链接(携带参数): <Link to='/demo/test/tom/18'}>详情</Link>
    注册路由(声明接收): <Route path="/demo/test/:name/:age" component={Test}/>
    接收参数:          const {id,title} = this.props.match.params

## 11.向路由组件传递 search 参数
    路由链接(携带参数):  <Link to='/demo/test?name=tom&age=18'}>详情</Link>
    注册路由(无需声明，正常注册即可):<Route path="/demo/test" component={Test}/>
    接收参数:         this.props.location.search 
    
    备注:获取到的 search 是 urlencoded 编码字符串，需要借助 querystring 解析(脚手架已经帮你下载好了直接引用 import qs from querystring)

## 12.state参数（url中不会显示state信息，安全）
    路由链接(携带参数):
<Link to={{pathname:'/demo/test', state:{name:'tom', age:18} }}> 详情 </Link>
    注册路由(无需声明，正常注册即可):<Route path="/demo/test" component={Test}/>
    接收参数:        this.props.location.state
    备注:当前页面（标签页）刷新也可以保留住参数

## 13.编程式路由导航
    借助 this.prop.history 对象上的API对操作路由跳转、前进、后退
    -this.prop.history.push()
    -this.prop.history.replace()
    -this.prop.history.goBack()
    -this.prop.history.goForward()
    -this.prop.history.go()

## 14.非路由跳转组件
不是所有组件都通过路由跳转，但也需要抓去路由上下文，解决方案：
1.通过路由跳转 <Route component={丢失上下文的组件}>
2.通过属性传递 <丢失上下文的组件 {this.props}>  (this是父组件，在丢失上下文的组件中解构出父组件传递的的history，loaction)
3.通过 withRouter 包装
```js
import {withRouter} from'react-router-dom'
class demo extends React.component{}

export default withRouter(demo)
```


# 2.深入了解react组件及通信
## 1.setState
    深入setState
    一、setstate()更新状态的动作是异步还是同步的?----要看setstate的执行位置
        (1)．在由react所控制的回调中更新的动作是【异步】的:生命周期勾子、react事件监听回调
        (2)．在非react控制的异步回调中更新的动作是【同步】的:定时器回调、原生事件回调
    
    二、setState的两种写法:
    (1)．对象式写法: setstate( statechange，[callback])
        1.statechange为状态改变对象(该对象可以体现出状态的更改)
        2.callback是可选的回调函数，它在状态更新完毕、界面也更新后(render调用后)才被调用
    (2)．函数式写法:setstate(updater，[callback])
    
    //例子：
```js
this.setstate((state,props)=>{count:state.count++}) //依赖于原状态
```
```js
//在setState函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用
this.setState({
      load: !this.state.load,
      count: this.state.count + 1
    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
```
        1.updater为返回statechange对象的函数。
        2.updater可以接收到state和props。
        3.callback是可选的回调函数，它在状态更新、界面也更新后(render调用后)才被调用。
总结:
    1.对象式的setstate是函数式的setstate的简写方式(语法糖)
    2.使用原则:
        (1).如果新状态不依赖于原状态===>使用对象方式
        **(2).如果新状态依赖于原状态===>使用函数方式**
        **(3).如果需要在setstate()执行后获取最新的状态数据，要在第二个callback函数中读取。**

## 2.React路由组件懒加载
  //1.通过React的lazy函数配合 import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
```js
    const Login = lazy(()=>import('xxx/xxxx/test'))
```

  //2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading
<Suspense fallback={<h1>loading...</h1>}>
    <Switch>
        <Route path=" /xxx" component={Xxxx}/><Redirect to="/ login" />
    </Switch>
</Suspense>

## 4.Effect Hook
(1).Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2).React中的副作用操作:
        发ajax请求数据获取设置订阅/启动定时器
(3)．语法和说明:
    useEffect(() =>{
            //在此可以执行任何带副作用操作，模拟 DidMount(), DidUpdate()生命周期钩子
            return () => {}  //如果return一个函数，表示 componentwillUnmount()钩子
    }，[stateValue])   //如果指定的是空数组[]，回调函数只会在第一次 render() 后执行
(4)．可以把useEffect Hook看做如下三个函数的组合:
      *componentDidMount()*
      *componentDidUpdate()*
      *componentwillUnmount()*

## 5.Ref Hook
(1). Ref Hook可以在函数组件中存储,查找组件内的标签或任意其它数据
(2)．语法: const refContainer = useRef()
(3)．作用:保存标签对象,功能与React.createRef()一样

## 6.Context理解(常用于[祖][后]组件通信)
    一种组件间通信方式,常用于【祖组件】与【后代组件】间通信使用
    1)）创建Context容器对象:
```js
        const xxxContext = React.createContext()
        //const {Provider,Consumer} = React.createContext()
        //const { Provider }  = xxxContext
```
    2）渲染子组时，外面包裹 xxxContext.Provider，通过value属性给后代组件传递数据:
```js
    <Provider value = { 数据 }>
            <子组件>
    </Provider>
```
    3)后代组件读取数据:
    //如果不写在一个页面中，记得引入从祖组件中暴露 xxxContext 然后在要用的后代组件中引入 
    //第一种方式:仅适用于类组件
```js
    static contextType = xxxContext     //声明接收context 
    const {...} = this.context          //读取context中的value数据
```
        //第二种方式:函数组件与类组件都可以
        //在引入的 xxxContext 中解构 Consumer
 ```js
        const { Consumer } = xxxContext
        <Consumer>
            {
                value =>(  //value就是context中的value数据
                要显示的内容 )
            }
        </Consumer>
```
        








## 7.组件优化 PureComponent
component的2个问题
    1.只要执行 setState(),即使不改变状态数据,组件也会重新render()  ==>效率低
    2.只当前组件重新 render()就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==>
效率低效率高的做法
    只有当组件的state或props数据发生改变时才重新render()
原因
    Component中的shouldComponentUpdate()总是返回true解决
办法1:
    重写shouldComponentUpdate()方法
    比较新旧state或props数据，如果有变化才返回true，如果没有返回fa1se
办法2∶
    使用PureComponent
    PureComponent重写了shouldComponentUpdate()，只有state或props数据有变化才返回true
注意:
    只是进行state和props数据的浅比较，如果只是数据对象内部数据变了，返回fa1se
    不要直接修改state数据，而是要产生新数据项目中一般使用PureComponent来优化

## 8.render props
如何向组件内部动态传入带内容的结构(标签)?
    vue中:
    使用slot技术，也就是通过组件标签体传入结构
        <A>
            <B/>
        </A>
    React中:
    使用children props:通过组件标签体传入结构
    使用render props:通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

在 main 组件中，A是B的父组件，但实际上B没有在A中定义，而是直接在这里写
<A>
    <B>XXXX</B>
</A>
{this.props.children}

问题:
如果B组件需要A组件内的数据，做不到
将 main 组件写成以下样子，通过在 A 中返回一个 render函数渲染C组件并且传递data
```js
<A render= {(data)=> <C data={data}></C> }>  </A>
```
```js
在A组件中: render（）{
	return (<div>
				<div>这是A组件</div>
				{this.props.render(data)}
			</div>
	)
}
```
```js
c组件:读取A组件传入的数据显示 
			<div>
				<div>这是C组件</div>
				{this.props.data}
			</div>
```

## 9.错误边界
理解:
    错误边界(Error boundary):用来捕获后代组件错误，渲染出备用页面

特点:
    只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

使用方式:
    getDerivedStateFromError 配合 componentDidCatch

```js
//生命周期函数，一旦后台组件报错，就会触发
static getDerivedstateFromError (error) {
    conso1e.log(error );
    // 在render之前触发
    // 返回新的state
    return {
        hasError : true
    };
}
componentDidCatch(error, info) {
    //统计页面的错误。发送请求发送到后台去
    console.log(error , info);
}
```

## 10.组件通信方式总结
    组件间的关系:
            父子组件
            兄弟组件|(非嵌套组件)
            祖孙组件(跨级组件)
    几种通信方式:
        1.props :
             最简单的方式
        2.消息订阅-发布:
            pubs-sub,event等等
        3.集中式管理:
            redux.dva等等
         4.conText:
            生产者-消费者模式
    比较好的搭配方式:
            父子组件:props
            兄弟组件:消息订阅-发布、集中式管理
            祖孙组件(跨级组件):消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

# 3、React组件之间通信方式？
    ·父子组件,父->子直接用Props,子->父用callback回调
    ·非父子组件,用发布订阅模式的Event模块
    ·项目复杂的话用Redux、Mobx等全局状态管理管库
    ·Context Api context 会使组件复用性变差

·Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法.如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。
·组件组合缺点：会使高层组件变得复杂

# 4、**setState是同步还是异步**
1、setState只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

2、setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

3、setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。
```js
//在setState函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用
this.setState({
      load: !this.state.load,
      count: this.state.count + 1
    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
```

# 5、React前置授权路由（官方没提供需要自己写）
    需要自定义路由。自定义一个组件代替路由，在组件中根据条件返回一个 Route 组件指向目标组件
    最后关系为 switch>自定义组件>Route>目标组件

```js
类组件式
<Auth path="/user" component={user}>

export default class Auth extends react.component{
    state={
        hassendAuth:false, //是否发送过介权请求，没有请求过权限直接返回，不进行下一步判断不进入目标组件
        auth:false,        //介权是否通过           (请求权限是否成功)
        data:{}            // 预载数据（在调到目标路由前预先加载数据）
    };

    async componentDidMount(){
        let res = await axios(......)
        //数据请求回来
        this.setState({
            auth:res.data.auth,
            hassendAuth:true,
            data:res.data.data
        })
    }

    render(){
        let {component:Component} = this.props //解构出路由传递的组件，并且重命名（这里的Component 就是user）
        if(！this.state.hassendAuth) return null;  
        
        // 为什么要用 render 而不是直接 components={this.props.component} ?
        //因为在 Auth权限验证组件中请求的参数不能直接传递到 目标 component 上 
        // (components={this.props.component}) 传的是组件的本体，传不了数据）
        // 所以用 render(  ()=>{ <目标组件 data={需要传递的数据}  />})  传的是组件的调用
        return <Route render={props=>(             //...props 目标组件需要的剩余路由信息传给他，（exact...）
            this.state.auth?                           
            <Component {...props} data={this.state.data}/> //数据预载，将前置路由提前请求的数据传过去
            :
            <Redirect to="/login"/>
        )} > 
    }

}

//  render() {
//  // 获取token
//  const token=localStorage.getItem('token');
//  // 进行判断如果有token则进入当前主页否则跳转至登录页面
//  if(token){
//      return(
//          // <Route component={Home}></Route>
//          <Route component={this.props.component}></Route>
//          // 接受父组件传过来的component组件值
//          )
//  }else{  
//      return(
//          <Redirect to='/login' />
//          // 使用Redirect做重定向，跳转到我们定义的组件当中     
//  }
```

```js
函数组件式
<Auth path="/user" component={user}>

export default  Auth =({component:Component,...rest})=>(
 <Route  {...rest} render={ props=>(
     Math.random()<0.5? <Component data={...}  {...props}/> : <Redirect to="/ login">
 )
 }/> 
)

```


# 6、React后置路由（Prompt）
```js
import {Prompt} from 'react-router-dom';

export default class Reg extends React.component{
    state = {
        isBlocking:true //判断是否离开页面的布尔值
    }

    render(){
        return (
           <Link to="/detail">跳转到 detail </Link>
            .....
            // Prompt 组件不会被渲染，只会进行路由跳转判断，是否离开
            <Prompt
                when={this.state.isBlocking}        // when 判断是否为 true，为 true 进入下一个组件
                message={location => {
                    //可以接收要传入的参数如（当前组件的location或其他或空）,自定义一些操作 
                    //可以在message 里动态改变 isBlocking 的值来决定离不离开页面
                    if(...条件...){this.setState({isBlocking:false})}
                    console.log(location)
                }} 
            />
        )
    }
}

```


# 7.React Context(上下文) 作用和使用
## 1.Context
Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

*React.createContext*：创建一个上下文的容器(组件), defaultValue可以设置共享的默认数据
调用react的createContext()方法, 产生生产者和消费者组件.
```js
// context.js
import React from 'react'
let { Consumer, Provider } = React.createContext();
export {
    Consumer,
    Provider
}
```

```js
import React from 'react'
import List from './List'

import {Provider} from './context'

export default class Demo extends React.Component {
    state:{
        value:xxx
    }
    render() {
        return (
            <Provider value={/*共享的数据*/}>
                 /*里面可以渲染对应的内容*/
            </Provider>
        );
    }
}
```

consumer(消费者):这个可以理解为消费者。 他是专门消费供应商(Provider 上面提到的)产生数据。Consumer需要嵌套在生产者下面。才能通过回调的方式拿到共享的数据源。当然也可以单独使用，那就只能消费到上文提到的defaultValue
```js
<Consumer>
  {value => /*根据上下文  进行渲染相应内容*/}
</Consumer>

```
## 例子
```js
    import React, { createContext } from 'react';
    // 创建Context的唯一方法
    const ThemeContext = createContext()
    
    class App extends React.Component {
      render () {
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={'red'}>
            <Middle></Middle>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          <ThemeContext.Consumer>
            {
              theme => <h1>ThemeContext 的 值为 {theme}</h1>
            }
          </ThemeContext.Consumer>
        )
      }
    }
      
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    export default App;
```

当 Provider 提供的值更改时，Consumer 必须重新渲染
```js
import React, { createContext } from 'react';
    // 创建Context的唯一方法
    const ThemeContext = createContext()

    class App extends React.Component {
      state = {
        theme: 'red'
      }
      render () {
        const { theme } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
            <button onClick={() => {this.setState({ theme: 'yellow'})}}>按钮</button>
            <Middle></Middle>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          <ThemeContext.Consumer>
            {
              theme => <h1>ThemeContext 的 值为 {theme}</h1>
            }
          </ThemeContext.Consumer>
        )
      }
    }
      
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    export default App;
```

当出现多个Context的时候，应该如何使用呢
```js
   import React, { createContext } from 'react';

    // 创建Context的唯一方法
    const ThemeContext = createContext()
    const SizeContext = createContext()
    
    class App extends React.Component {
      state = {
        theme: 'red',
        size: 'small'
      }
      render () {
        const { theme, size } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当出现多个Context的时候，只需要将Context.Provider 嵌套即可 */}
            <SizeContext.Provider value={size}>
              {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
              <button onClick={() => {this.setState({ theme: 'yellow', size: 'big'})}}>按钮</button>
              <Middle></Middle>
            </SizeContext.Provider>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
          <ThemeContext.Consumer>
            {
              theme => (
                <SizeContext.Consumer>
                  {
                    size => (<h1>ThemeContext 的 值为 {theme}; SizeContext 的值为 {size}</h1>)
                  }
                </SizeContext.Consumer>
              )
            }
          </ThemeContext.Consumer>
        )
      }
    }
    
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    export default App;
```



# 8.React 提供三种方式创建 Refs:
1.字符串 Refs （将被废弃）
2.回调函数 Refs
3.React.createRef (从React 16.3开始)
## 1.字符串 Refs 
```js
class MyComponent extends React.Component {
  myclick() {
    //通过 this.refs. 获取
    const value = this.refs.inputField.value;
  }
  render() {
    return (
      <div>
        {/* 创建一个字符串 ref: inputField */}
        <input type="text" ref="inputField" />
        button onClick ={this.myclick}>点我</button>
      </div>
    );
  }
}
```

## 2.回调函数 Refs
```js
class Demo extends React.Component {
    render() {
        // 箭头函数没有this，往外找是Demo的实例对象, 把当前的ref所在的节点当作函数的实参传给了input1属性
        return (
            <div>
                <input ref={currentNode => this.input1 = currentNode} type="text" placeholder="点击按钮提示数据"/>&nbsp;    
                <button onClick={this.showData}>点击提示左侧的数据</button>&nbsp;
            </div>
        )
    }
    showData = () => {
        const {input1} = this;
        console.log(this);
        console.log(input1.value);
    }
}
```

## 3.React.createRef
```js
class CustomTextInput extends React.Component {
  textInput = React.createRef();

  focusText=()=> {
    // 注意：我们通过 .current 去获得DOM节点
    this.textInput.current.focus();
  }
  
  render() {
    // 告诉React我们想要将<input>的ref和构造器中创建的textInput联系起来
    return (
      <div>
        <input  type="text" ref={this.textInput} />
        <button onClick={this.focusText}><button>
      </div>
    );
  }
}
```



# 9.**React 生命周期**（新旧对比）
## 旧生命周期：
```js
1.挂载过程
// getDefaultProps（设置默认的props，只会调用一次）
// getInitialState（设置默认的state，只会调用一次）
 ·componentWillMount()
 ·render()
 ·componentDidMount()
 ·componentWillunmount()
```
```js
2.更新过程
 ·componentWillReceiveProps(newProps) （父组件重传props时就会调用，在该函数中调用 this.setState() 不会引起第二次渲染。）
 ·shouldComponentUpdate(nextProps, nextState)
 ·componentWillUpdate(nextProps, nextState)
 ·render
 ·componentDidUpdate(prevProps, prevState)
```

 ## 新生命周期：（没什么用）
1. static **getDerivedStateFromProps**(props, state)
增加了*静态函数* getDerivedStateFromProps 来取代 *componentWillMount* 与 *componentWillUpdate*，强制开发者在render之前只做无副作用的操作，而且能做的操作局限在根据props和state决定新的state。
*触发时机:* 会在每次组件被重新渲染前被调用, 这意味着无论是父组件的更新, props 的变化, 或是组件内部执行了 setState(), 它都会被调用。
在组件创建时和更新时的render方法之前调用，它应该返回一个对象来更新状态，或者返回null来不更新任何内容。
getDerivedStateFromProps 里面的 *this为undefined*

2. **getSnapshotBeforeUpdate**(prevProps, prevState) 
增加了 getSnapshotBeforeUpdate 取代了 *componentWillReceiveProps*
·在最近一次渲染输出（提交到 DOM 节点）之前调用。使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。
·可以访问更新前的 props 和 state。
·需要与 componentDidUpdate() 方法一起使用，否则会出现错误。

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
    //我们是否要添加新的 items 到列表?
    // 捕捉滚动位置，以便我们可以稍后调整滚动.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //如果我们有snapshot值, 我们已经添加了 新的items.
    // 调整滚动以至于这些新的items 不会将旧items推出视图。
    // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
```

# 10.useMemo与useCallback
useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
useMemo返回缓存的变量
useCallback返回缓存的函数

useEffect、useMemo、useCallback都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用ref来访问。

# 11.**React15 和 React16 的架构（Fiber）对比**
## React 15 时期的渲染机制
15版本是基于**Stack Reconcilation(栈调和器)**。它是递归、同步的方式。栈的优点在于用少量的代码就可以实现diff功能。并且非常容易理解。但是它也带来了严重的性能问题。
（“调和”又译为“协调”：通过如 ReactDOM 等类库使虚拟 DOM 与“真实的” DOM 同步这一过程叫作协调（调和）。）

### React15时期架构的缺点
React15架构可以分为两层：
*Reconciler（协调器）*—— 负责找出变化的组件(react 会采用递归对比虚拟DOM树，找出需要变动的节点，然后同步更新它们)
*Renderer（渲染器）*—— 负责将变化的组件渲染到页面

每当有更新发生时，*Reconciler*会做如下工作：
  ·调用组件的render方法，将返回的JSX转化为虚拟DOM
  ·将虚拟DOM和上次更新时的虚拟DOM对比
  ·通过对比找出本次更新中变化的虚拟DOM
  ·通知Renderer将变化的虚拟DOM渲染到页面上

而React15使用的是*栈调和器*，由于递归执行，所以*更新一旦开始，中途就无法中断，中断后就不能恢复了*。当调用层级很深时，递归更新时间超过了屏幕刷新时间间隔，用户交互就会卡顿。

## *React16架构概览（多了一个调度器）*
**!!**(
1.React希望能够彻底解决主线程长时间占用问题，于是引入了 Fiber 来改变这种不可控的现状，把渲染/更新过程拆分为一个个小块的任务，通过合理的调度机制来调控时间，指定任务执行的时机，从而降低页面卡顿的概率，提升页面交互体验。通过Fiber架构，让reconcilation过程变得可被中断。适时地让出CPU执行权，可以让浏览器及时地响应用户的交互。

2.React16中使用了 Fiber，但是*Vue 是没有 Fiber* 的，为什么呢？原因是二者的优化思路不一样：
  ·Vue 是基于 template 和 watcher 的组件级更新，把每个更新任务分割得足够小，不需要使用到 Fiber 架构，将任务进行更细粒度的拆分
  ·React 是不管在哪里调用 setState，都是从根节点开始更新的，更新任务还是很大，需要使用到 Fiber 将大任务分割为多个小任务，可以中断和恢复，不阻塞主进程执行高优先级的任务

*3.什么是Fiber?*
Fiber 可以理解为*一个执行单元*，每次执行完一个执行单元，react 就会检查现在还剩多少时间，如果没有时间则将控制权让出去。React Fiber 与浏览器的核心交互流程如下：
![react-Fiber](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\react-Fiber.png)
Fiber 还可以理解为是*一种数据结构*，React Fiber 就是采用*链表*实现的。每个 Virtual DOM 都可以表示为一个 fiber。
fiber 节点包括了以下的属性：
（1）type & key
fiber 的 type 和 key 与 React 元素的作用相同。fiber 的 type 描述了它对应的组件，对于复合组件，type 是函数或类组件本身。对于原生标签（div，span等），type 是一个字符串。随着 type 的不同，在 reconciliation 期间使用 key 来确定 fiber 是否可以重新使用。

（2）stateNode
stateNode 保存对组件的类实例，DOM节点或与 fiber 节点关联的其他 React 元素类型的引用。一般来说，可以认为这个属性用于保存与 fiber 相关的本地状态。

（3）child & sibling & return
child 属性指向此节点的第一个子节点（大儿子）。
sibling 属性指向此节点的下一个兄弟节点（大儿子指向二儿子、二儿子指向三儿子）。
return 属性指向此节点的父节点，即当前节点处理完毕后，应该向谁提交自己的成果。如果 fiber 具有多个子 fiber，则每个子 fiber 的 return fiber 是 parent 。


4.*requestAnimationFrame*
在 Fiber 中使用到了requestAnimationFrame，它是浏览器提供的绘制动画的 api 。它要求浏览器在下次重绘之前（即下一帧）调用指定的回调函数更新动画。

5.*requestIdleCallback*
requestIdleCallback 也是 react Fiber 实现的基础 api 。我们希望能够快速响应用户，让用户觉得够快，不能阻塞用户的交互，requestIdleCallback能使开发者在主事件循环上执行后台和低优先级的工作，而不影响延迟关键事件，如动画和输入响应。正常帧任务完成后没超过16ms，说明有多余的空闲时间，此时就会执行requestIdleCallback里注册的任务。
具体的执行流程如下，开发者采用requestIdleCallback方法注册对应的任务，告诉浏览器我的这个任务优先级不高，如果每一帧内存在空闲时间，就可以执行注册的这个任务。另外，开发者是可以传入timeout参数去定义超时时间的，如果到了超时时间了，浏览器必须立即执行，使用方法如下：
```js
window.requestIdleCallback(callback, { timeout: 1000 })。
```
浏览器执行完这个方法后，如果没有剩余时间了，或者已经没有下一个可执行的任务了，React应该归还控制权，并同样使用requestIdleCallback去申请下一个时间片。
window.requestIdleCallback(callback)的callback中会接收到默认参数 deadline ，其中包含了以下两个属性：
  ·timeRamining 返回当前帧还剩多少时间供用户使用
  ·didTimeout 返回 callback 任务是否超时


*6.Fiber执行原理*
从根节点开始渲染和调度的过程可以分为两个阶段：render 阶段、commit 阶段。
  render 阶段：这个阶段是可中断的，会找出所有节点的变更
  commit 阶段：这个阶段是不可中断的，会执行所有的变更
*render阶段：*
此阶段会找出所有节点的变更，如节点新增、删除、属性变更等，这些变更 react 统称为副作用（effect），此阶段会构建一棵Fiber tree，以虚拟dom节点为维度对任务进行拆分，即一个虚拟dom节点对应一个任务，最后产出的结果是effect list，从中可以知道哪些节点更新、哪些节点增加、哪些节点删除了。
*遍历流程：*
React Fiber首先是将虚拟DOM树转化为Fiber tree，因此每个节点都有child、sibling、return属性，遍历Fiber tree时采用的是后序遍历方法：
收集effect list
*收集所有节点的变更产出effect list：*
在遍历过程中，收集所有节点的变更产出effect list，注意其中只包含了需要变更的节点。通过每个节点更新结束时向上归并effect list来收集任务结果，最后根节点的effect list里就记录了包括了所有需要变更的结果。
收集effect list的具体步骤为：
  ·如果当前节点需要更新，则打tag更新当前节点状态（props, state, context等）
  ·为每个子节点创建fiber。如果没有产生child fiber，则结束该节点，把effect list归并到return，把此节点的sibling节点作为下一个遍历节点；否则把child节点作 ·为下一个遍历节点
  ·如果有剩余时间，则开始下一个节点，否则等下一次主线程空闲再开始下一个节点
  ·如果没有下一个节点了，进入pendingCommit状态，此时effect list收集完毕，结束。
*commit阶段*
commit 阶段需要将上阶段计算出来的需要处理的副作用一次性执行，此阶段不能暂停，否则会出现UI更新不连续的现象。此阶段需要根据effect list，将所有更新都 commit 到DOM树上。

*最后：*
  根据一个 fiber 的 effect list 更新视图。
  计算完成每个 fiber 的effect list后，调用 **commitRoot** 完成视图更新
)


**React16架构可以分为三层：**
*Scheduler（调度器）*—— 调度任务的优先级，高优任务优先进入Reconciler
*Reconciler（协调器）*—— 负责找出变化的组件
*Renderer（渲染器）*—— 负责将变化的组件渲染到页面上

**Reconciler（协调器）**
当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来，继续被中断的工作。所以React就实现了一个Scheduler（调度器），除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。*(利用每一帧的空余时隙去更新)*
我们可以看见，更新工作从递归变成了*可以中断*的循环过程。每次循环都会调用shouldYield判断当前是否有剩余时间。
```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```
同时注意,16中的更新是可中断的，那React如何解决要是中断了，DOM渲染不完全的问题呢？
在React16中，Reconciler与Renderer*不再是严格同步*的（不是一协调完一个就立刻通知Renderer去渲染）。而是当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记（*收集所有节点的变更——effect list，收集完后进入 commit 阶段，根据effect list统一完成更新，这个 commit 阶段无法打断，否则会出现画面不流畅。*）。
整个Scheduler与Reconciler的工作都在内存中进行。只有*当所有组件都完成Reconciler的工作*，才会统一*交给Renderer*。

*中断的原因：*
·其他更高优先级任务需要先更新
·当前帧没有剩余时间
由于都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM。
事实上，由于Scheduler和Reconciler都是平台无关的，所以React为他们单独发了一个包react-Reconciler。你可以用这个包自己实现一个ReactDOM

## 总结
1.React15 使用的是栈调和器，栈调和器是递归执行调和操作的，更新一旦开始，中途就无法中断。倘若递归层级过深，则可能会造成浏览器渲染卡顿。
2.React16 使用的是全新的"Fiber调和器"，这就依托于React16的重点了—Fiber架构。目前简要概括就是，React16能够实现*中断调和*，*分批次异步地调和*。从而达到*不因为JS执行时间过久影响浏览器渲染*。

# 12.**redux三大件**：store、action、reducer简述
*store*
一个对象，保存着对redux中的操作方法，包括dispatch（发送action），subscribe(订阅redux中的状态变化)和getState（获得状态）。store是只读的，Redux 应用有且只有一个单一的 store。

*action*
主要有两个作用：
用type字段描述我们准备执行的动作，通知reducer进行相应的处理；
向reducer传递数据，它是store数据的唯一来源。

*reducer*
也有两个作用：
分发action,根据action中type的不同，处理不同的事件；
返回新的state。

redux三大原则
1.单一数据源：所有状态都保存在单一的store中
2.state是只读的：不能直接对store进行修改，只能用新的store替换旧的store
3.使用纯函数来执行修改：reducer是只读的

# 13.React diff算法Part 1: 传统diff算法的时间复杂度为什么是O(n^3)?
传统的diff算法计算一棵树变成另一棵的复杂度是O(n^3)。有一个基本的概念需要了解，编辑距离（edit distance）。
Wiki的解释是：edit distance is a way of quantifying how dissimilar two strings (e.g., words) are to one another by counting the minimum number of operations required to transform one string to the other。=> 我的理解是从一个东西变成另一个东西的最少步骤。传统的diff算法里，从一棵树变成另一棵的需要的最少步骤，解决这个问题（tree edit distance）的时间复杂度是O(n^3)，怎么来的呢？

两棵树中的节点一一进行对比的复杂度为O(n^2)，树1上的点1要遍历树2上的所有的点，树1上的点2也要遍历树2的所有点，以此类推，复杂度为O(n^2)。如果在比较过程中发现树1（也就是旧树）上的一个点A在树2（新树）上没有找到，点A会被删掉，在老diff算法里点A被删后的空位，需要遍历树2上的所有点去找到一个可以填充它，复杂度为O(n)。

**总结一下**，对于旧树上的点A来说，它要和新树上的所有点比较，复杂度为O(n)，然后如果点A在新树上没找到的话，点A会被删掉，然后遍历新树上的所有点找到一个去填空，复杂度增加为了O(n^2)，这样的操作会在旧树上的每个点进行，最终复杂度为O(n^3)。





# 14.React Diff算法详解

# 15.React 函数式组件进行优化
React 性能优化思路
主要方向就是这两个：
1.减少重新 render 的次数。因为在 React 里最重(花时间最长)的一块就是 reconciliation(简单的可以理解为 diff)，如果不 render，就不会 reconciliation。
2.减少计算的量。主要是减少重复计算，对于函数式组件来说，每次 render 都会重新从头开始执行函数调用。

**1.React.memo**
React.memo 高级用法
默认情况下其只会对 props 的复杂对象做浅层对比(浅层对比就是只会对比前后两次 props 对象引用是否相同，不会对比对象里面的内容是否相同)，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
```js
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);

```
**2.useCallback**
```js
const callback = () => {
  doSomething(a, b);
}

const memoizedCallback = useCallback(callback, [a, b])
```
把函数以及依赖项作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，这个 memoizedCallback 只有在依赖项有变化的时候才会更新。

**3.useMemo**
```js
function computeExpensiveValue() {
  // 计算量很大的代码
  return xxx
}

const memoizedValue = useMemo(computeExpensiveValue, [a, b]);
```
useMemo 的第一个参数就是一个函数，这个函数*返回的值*会被缓存起来，同时这个值会作为 useMemo 的返回值，第二个参数是一个数组依赖，如果数组里面的值有变化，那么就会重新去执行第一个参数里面的函数，并将函数返回的值缓存起来并作为 useMemo 的返回值 。


# 16.useEffect 和 useLayoutEffect

*useEffect*(异步，可能会在DOM变更后，且浏览器重新绘制之后完成执行)
基本上90%的情况下,都应该用这个,这个是在render结束后,你的callback函数执行,但是不会block browser painting,算是某种异步的方式吧,但是class的componentDidMount 和componentDidUpdate是同步的,在render结束后就运行,useEffect在大部分场景下都比class的方式性能更好.

*useLayoutEffect*（同步，会在DOM变更后，但在浏览器重新绘制之前执行，阻塞绘制)
这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.

# 17.理解函数组件与类组件的区别优劣
## 1）状态同步问题，函数组件会捕获当前渲染时所用的值。但往往这被忽略了。

## 2）生命周期
On Mounting(componentDidMount)
生命周期函数 componentDidMount 在第一次渲染完成后就会被调用。
```js
const FunctionalComponent = () => {
 React.useEffect(() => {
   console.log("Hello");
 }, []);
 return <h1>Hello, World</h1>;
};
```
在函数组件中，我们使用 useEffect hook 来替代componentDidMount。第二个参数通常是一个包含变化的state的数组，而 useEffect 将只在这些选定的state变化时被调用。但是当它是一个空数组时，它只在挂载时被调用一次。这是componentDidMount 的完美替代。

我们也可以使用 useState hook 进行unmount。但是要注意，语法有点不同。我们需要做的是在 useEffect 函数里面返回一个在unmount时运行的函数。当你需要清理 clearInterval 等函数时，这一点特别有用。使用 useEffect 的一个好处是，我们可以在同一个地方同时写挂载和卸载的函数。

## 3）性能优化
    类组件 shouldComponentUpdate 这个生命周期，通常我们在这个生命周期中进行组件的优化，通过判断前一个props和当前的props是否有变化来判断组件是否需要渲染，或者通过PureComponent实现；
    在函数组件中我们通过 React.memo() 来实现。
    但是当父组件将自己定义的引用类型的值传递给子组件时，即使值没有改变。但是由于每次渲染的时候都会生成新的变量，导致引用发生了改变，所以子组件仍然会渲染
    针对上面这个现象，通常考虑使用useCallback，useMemo来实现优化，看下面这个例子，useCallback,useMemo，现在我们发现即使我们不停的点击按钮，也不会重新触发子组件的渲染，并且useEffect也不会执行。这是因为useCallback，useMemo在依赖数组没变的情况下，都读取了缓存，没有重新生成函数或者对象。

## 4）自定义hook实现 *代码复用*
    函数组件：自定义hook
    原本我们需要在B和D组件中都进行状态的定义和数据的获取，B和D组件如下：
组件B/D：
```js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
function B() {
	const [lists, setLists] = useState([])
	useEffect(() => {
		const getLists = async () => {
			const data = await axios.get('xxx/xxxx') //数据请求地址
			setLists(data)
		}
		getLists()
	}, [])
	return(
		//渲染
		<>
			{lists.map(item) => ()}
		</>
	)
}
export default B
```
现在可以自定义一个hook，将同样的代码只写一次，如下：
useAxios.js：
```js
import {useState, useEffect} from 'react'
import axios from 'axios'
function useAxios(name) {
	const [lists, setLists] = useState([])
	useEffect(() => {
		const getLists = async () => {
			const data = await axios.get(name)
			setLists(data)
		}
		getLists()
	}, [name])
	return lists
}
export default useAxios
```
组件B/D：
```js
import React from 'react'
import useAxios from '../customHooks/useAxios'
function B() {
	const lists = useAxios('xxx/xxxx')//数据请求地址
	return(
		//渲染
		<>
			{lists.map(item) => ()}
		</>
	)
}
export default B
```

下面对比用类组件实现：
类组件：HOC(高阶组件)与Render Props
```js
组件B/D:
import React, {Component} from 'react'
import axios from 'axios'
class B extends Component {
	constructor () {
		super()
    	this.state = { lists: [] }
	}

    componentWillMount () {
		const data = await axios.get('xxx/xxxx')//数据请求地址
		this.setState({ lists: data })
    }

    render () {
		//渲染
		return (
			<>
				{this.state.lists.map(item) => ()}
			</>
		)
    }
}
export default B
```
利用HOC（高阶组件写法如下）：
wrapWithAjax.js(这是一个HOC):
```js
import React, {Component} from 'react'
import axios from 'axios'
const wrapWithAjax = (WrappedComponent, name) => {
	return class extends Component {
		constructor() {
			super()
			this.state = { lists: [] }
		}
		
		componentWillMount() {
			const data = await axios.get(name)//数据请求地址
			this.setState({ lists: data })
    	}
		
		render() {
			return (
				<WrappedComponent lists={this.state.lists} />
			)
		}
	}
}
```
B/D组件:
```js
import React from 'react'
import wrapWithAjax from './wrapWithAjax'
class B extends Component {
    render() {
		//渲染
		return (
			<>
				{this.props.lists.map(item) => ()}
			</>
		)
    }
}
B = wrapWithAjax(B, 'xxx/xxxx')
export default B
```
    通过上面这个例子，可以清除的发现函数式组件自定义hook的方式使用的代码量更少，而且相比HOC更加直观，代码可读性更高也更易于理解。而且通过观察HOC的代码，一个HOC相当于对原来的组件做了一层代理，那么就避免不了‘嵌套地狱’的出现。



## *总结：*
·函数组件语法更短、更简单，这使得它更容易开发、理解和测试。
·类组件也会因大量使用 this 而让人感到困惑。函数式组件可以避免复杂的this


   

# 18. 自定义hook
```js
useAxios.js：
import {useState, useEffect} from 'react'
import axios from 'axios'
function useAxios(name) {
	const [lists, setLists] = useState([])
	useEffect(() => {
		const getLists = async () => {
			const data = await axios.get(name)
			setLists(data)
		}
		getLists()
	}, [name])
	return lists
}
export default useAxios

组件B/D：
import React from 'react'
import useAxios from '../customHooks/useAxios'
function B() {
	const lists = useAxios('xxx/xxxx')//数据请求地址
	return(
		//渲染
		<>
			{lists.map(item) => ()}
		</>
	)
}
export default B

```

# 100.React面试题（setState修改数据）
```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};

//答案：
1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。
2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。
3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。
输出： 0 0 2 3
```



