# JS
ES6 箭头函数时的this在定义时就绑定了

## 0.ES6
·新增symbol类型 表示独一无二的值，用来定义独一无二的对象属性名;
·const/let  都是用来声明变量,不可重复声明，具有块级作用域。存在暂时性死区，也就是不存在变量提升。(const一般用于声明常量)
·变量的解构赋值(包含数组、对象、字符串、数字及布尔值,函数参数),剩余运算符(...rest);
·模板字符串(`${data}`);
·扩展运算符(数组、对象);;
·箭头函数;
·Set和Map数据结构;
·Proxy/Reflect;
·Promise;
·async函数;
·Class;
·Module语法(import/export)。


## 1.REM适配方案
```js
<div id="demo"></div>
//---------------------------方案一-----------------------------
<script type="text/javascript">
function adapter (){
	//获取手机横向的设备独立像素
	const dip = document.documentElement.clientwidth
	//计算根字体大小(100是我们自己指定的，375是设计稿宽度)
	const rootFontsize = (dip *100)/375
	//设置根字体
	document.documentElement.style.fontsize = rootFontSize + 'px"
	}
adapter()

window.onresize = adapter()
</script>

//CSS样式 ，用less可以方便计算
@font: 100rem;
.demo {
width:345/@font
}

//---------------------------方案二---------------------------------
<script type="text/javascript">
function adapter (){
	//获取手机横向的设备独立像素
	const dip = document.documentElement.clientwidth
	//计算根字体大小(100是我们自己指定的，375是设计稿宽度)
	const rootFontsize = dip/10
	//设置根字体
	document.documentElement.style.fontsize = rootFontSize + 'px"
	}
adapter()
window.onresize = adapter()
</script>

//CSS样式 ，用less可以方便计算
@font:375/10rem;
.demo {
width:345/@font
}
```

## 2.Fetch API 基本用法

(注意第一个then返回promise对象)
```js
fetch('http://localhost:3000/,
//第二个参数是配置对象，可不写，默认GET请求
{
    method：'POST'，
    header:{
    //Content-Type对应的是是否接受该请求和后续的解析方式
        Content-Type:'application/json'
    }
    //或 body：'username=yyn&pwd=123',
    body:JSON.stringtify({
        name:yzy,
        pwd:123
    })
}
).then( function (data) {
		// text()方法属于fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台返回的数据
		//return data.text();
		return data.json();
}).then( function (data) {
		console.log(data)
})

```

1.常用配置选项
	method (String) :	HTTP请求方法，默认为GET(GET、POST、PUT、DELETE)
	body (String) :		HTTP的请求参数
	headers (Object) :   HTTP的请求头，默认为

2.响应数据格式
	text(): 将返回体处理成字符串类型
	json(): 返回结果和JSON.parse(responseText)一样


## 3.**手写、说说bind、call、apply 区别？**
都是改变this指向，不过bind返回的是一个函数，而apply和call 直接返回结果。
apply的第二个参数接受的是一个数组，而 call 接受的是参数列表

```js
1. Function.prototype.myCall = function (context) {
            var context = context || window
            context.Fn = this
            let args = [...arguments].slice(1)
            const result = context.Fn(...args)
            delete context.Fn
            return result
        }

Function.prototype.myApply = function (context) {
            var context = context || window
            context.Fn = this
            let result
            let args = arguments[1]
            if (args) {
                if ((args instanceof Array)) {
                    result = context.Fn(...args)
                } else {
                    throw new TypeError('ERROR')
                }
            } else {
                result = context.Fn()
            }
            delete context.Fn
            return result
}

Function.prototype.myBind = function (context = window) {
    if (typeof this !== 'function') throw new Error('Error');
    let fn = this;
    let args = [...arguments].slice(1);
    
    return function F (...newArgs) {
        // 因为返回了一个函数，可以 new F()，所以需要判断
        if (this instanceof F) {
            return new fn(...args, ...newArgs);
        } else  {
            // bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以需要将两边的参数拼接起来
            return fn.apply(context, [...args,...newArgs]);
        }
    }
}
```


## 4.防抖节流
防抖：在delay时间后执行，如果在 delay 内再次触发，则重新计时。（取消定时器）
```js
function debounce (fn, delay) {
            const timer = null
            return function () {
                if(timer) clearTimeout(timer)
                let context = this
                timer = setTimeout(() => {
                    fn.apply(context,  [...arguments])
                }, delay)
            }
        }

//----------------------------------------------------------------
//立即执行版
const debounce = (fn, wait, immediate) => {
      let timer = null;
      return function (...args) {
    if (timer) clearTimeout(timer)
    let context = this
    if (immediate) {
      (!timer) && fn.call(context, ...args)  
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {// 后执行
      timer = setTimeout(() => {
        fn.call(context, ...args)
      }, wait)
    }
  }
};

```

节流：在delay时间后执行，如果在 delay 内再次点击不会触发函数。（判断有定时器时，不会触发函数）
```js
function throttle(fn, delay) {
            const timer = null
            return function () {
                let context = this
                if (!timer) {
                    timer = setTimeout(() => {
                        fn.apply(context, [...arguments])
                        clearTimeout(timer)
                    }, delay)
                }
            }
        }
```

## 5.简述HTTPS中间人攻击
参考答案
https协议由 http + ssl 协议构成，具体的链接过程可参考SSL或TLS握手的概述
    中间人攻击过程如下：
        服务器向客户端发送公钥。
        攻击者截获公钥，保留在自己手上。
        然后攻击者自己生成一个【伪造的】公钥，发给客户端。
        客户端收到伪造的公钥后，生成加密hash值发给服务器。
        攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
        同时生成假的加密hash值，发给服务器。
        服务器用私钥解密获得假秘钥。
        服务器用加秘钥加密传输信息
    
    防范方法：
        服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

## 6.JS的四种设计模式
1.工厂模式
```js
function createPerson(name, age, sex) {
            const obj = new Object()
            obj.name = name;
            obj.age = age;
            obj.sex = sex;
            obj.sayHi = function () {
                console.log('this.name');
            }
            return obj;
        }
```

2.单例模式
```js
    let OnlyPerson = function (name, age) {
            this.name = name;
            this.age = age;
        }
    OnlyPerson.prototype.sayHi = function () {
            console.log(this.name);
        }

    let getInstance = (
            function () {
                let Instance = null
                return function (name, age) {
                    if (!Instance) {
                        Instance = new OnlyPerson(name, age);
                    }
                    return Instance
                }
            })()
```

3.沙箱模式
```js
  let sandbox = (function () {
            function sayName() { }
            function sayAge() { }
            return {
                sayName: sayName,
                sayAge: sayAge
            }
        })()
```

4.发布者订阅模式
```js
let Public = {
            list: [],
            on: function (key, fn) {
                if (!this.list[key]) {
                    this.list[key] = []
                }
                this.list[key].push(fn)
            },
            emit: function (key, ...args) {
                let lists = this.list[key]
                for (let fn of lists) {
                    fn.apply(this, ...args)
                }
            }
    }  
```

## 7. **JS的变量提升（预编译）**
### 1.预编译
   #### 全局预编译的3个步骤：
    1.创建GO对象（Global Object）全局对象。
    2.进行词法分析(编译器会先将一连串字符打断成（对于语言来说）有意义的片段)、语法分析(编译器将一个 token 的流（数组）转换为一个“抽象语法树”)。
    3.开始预编译（预编译分为全局预编译和局部预编译，全局预编译发生在页面加载完成时执行，而局部预编译发生在函数执行的前一刻。）
        1.查找变量声明，作为GO属性，值赋予undefined
        2.查找函数声明，作为GO属性，值赋予函数体（函数声明优先）
```js
            GO / window = {
            //页面加载创建GO同时，创建了document、navigator、screen等等属性，此处省略
            a: undefined,
                c: undefined，
            b: function(y) {
                var x = 1;
                console.log('so easy');
                }
            }
```

   #### 局部预编译的4个步骤：
    1.创建AO对象（Activation Object）执行期上下文。
    2.找形参和变量声明，将变量和形参名作为AO属性名，值为undefined
    3.将实参值和形参统一。
    4.在函数体里面找函数声明，值赋予函数体。

### 3.解释执行
(直到代码执行，都叫做词法分析)


## 8.Undefined与Null的区别
区别：
 ```js
    typeof null; // "object"
    typeof undefined; // "undefined"
    !!(null); // false
    !!(undefined); // false
    Number(null); // 0
    Number(undefined); // NaN
    null == undefined; //true
    null === undefined; //false
    Object.prototype.toString(undefined) => '[object Undefined]'
    Object.prototype.toString(null) => '[object Undefined]' 
 ```
 Undefined ：
 1.定义变量但没有赋值
 2.访问对象上不存在的属性或者未定义的变量
 3.函数定义了形参但没有赋值，函数里输出形参为undefined
 4.使用Void（ECMAScript 明确规定 void 操作符 对任何表达式求值都返回 undefined）

 Null：
 1.如果定义的变量在将来用于保存对象，那么最好将该变量初始化为null，而不是其他值。
 2.当一个数据不再需要使用时，通过将其值设置为null来释放其引用（解除引用，让值脱离执行环境，以便垃圾收集器在下次运行时将其回收）

 

## 9.前端性能优化
### .计算性能指标（详见特殊小知识）
可以使用Navigation，timing 统计到的时间数据来计算一些页面性能指标，比如DNS查询耗时、白屏时间、domready等等。如下:
. DNS查询耗时= domainLookupEnd - domainLookupStart
. TCP链接耗时= connectEnd - connectStart
. request请求耗时= responseEnd - responseStart
· 解析dom树耗时= domComplete - domInteractive
· 白屏时间= domloadng - fetchStart
. domready时间= domContentLoadedEventEnd - fetchStart 
. onload时间= loadEventEnd - fetchStart

所以根据上面的时间点，我们可以计算常规的性能值，如下:
(使用该api时需要在页面完全加载完成之后才能使用，最简单的办法是在window.onload事件中读取各种数据，因为很多值必须在页面完全加载之后才能得出。)

![window.performance](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\window.performance.png)

### .减少DNS查询 
    ·由于DNS查找是需要时间的，而且它们通常都是只缓存一定的时间，所以应该尽可能地减少DNS查找的次数。
    ·减少DNS查找次数，最理想的方法就是将所有的内容资源都放在同一个域(Domain)下面，这样访问整个网站就只需要进行一次DNS查找，这样可以提高性能。
    ·但理想总归是理想，上面的理想做法会带来另外一个问题，就是由于这些资源都在同一个域，而HTTP /1.1 中推荐客户端针对每个域只有一定数量的并行度（它的建议是2），那么就会出现下载资源时的排队现象，这样就会降低性能。
    ·所以，折衷的做法是：建议在一个网站里面使用至少2个域，但不多于4个域来提供资源。我认为这条建议是很合理的，也值得我们在项目实践中去应用。

## 10.new 一个函数时发生了什么
    1.创建一个空对象 {}
    2.将空对象的原型(__proto__) 指向 构造函数(new的那个函数)的原型对象(prototype)
    3.将构造函数中的this指向新对象
    4.构造函数中若有返回值，就直接返回；否则返回新对象
```js
    function myNew(fn){
        let obj = Object.create(null)
        obj.__proto__ = fn.prototype
        let args =[...arguments].slice(1)
        const res = fn.apply(obj,args)
        if(Object.prototype.toString.call(res) === '[object Object]'){
            return res
        }
        return obj
    }

//为什么要判断返回值
    function Otaku (name, age) {
    this.strength = 60;
    this.age = age;
    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

```

## 11.闭包(普通函数闭包中的this)
闭包是指有权访问另外一个函数作用域中的变量的函数。保持对它的引用。
```js
var name = "Window";
var obj = {
  name : "Obj",
  run : function(){
  		//这里的 this 指向 obj对象,
  		console.log(this.name)
     return function(){
     	//这里的this指向window,因为这里通过闭包返回了一个匿名函数,匿名函数的执行环境具有全局性，因此其this对象通常指向window。
     	console.log(this.name)
    };
  }
}
    obj.run()(); //"The Window" 
```


## 12.数组扁平化（ES6自带和自己实现）与数组去重
   ### 数组扁平化
    设定一个多维数组
```js
let arr = [1,[2,[3,4],5,],6,7,8,9]
```
   #### 一、使用ES6自带的flat（），如果括号里不写默认为1，Infinity代表正无穷，即对多维数组全部拉平
```js
let newarr = arr.flat(Infinity)
```

   #### 二、reduce
```js
function flatten(arr) {
      return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
      }, []);
}
```

   #### 三、递归
```js
 const flatten = function (arr) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                res = res.concat(flatten(arr[i]))
            } else {
                res = res.concat(arr[i])
            }
        }
        return res
    }
```
   
   #### 四、展开运算符
```js
    function flattenMd(arr) {
        let flatten = arr => [].concat(...arr)//可去掉一层[]
        return flatten(arr.map(item => Array.isArray(item) ? flattenMd(item) : item))
    }
```

   ### 数组去重
   #### 1.filter实现
   ```js
   function distinct4(arr = testArr) {
    return arr.filter((v, i, array) => array.indexOf(v, i+1) < 0)
}
   ```
   ```js
   function distinct5(arr = testArr) {
    return arr.filter((v, i, array) => array.indexOf(v) === i)
}
   ```
 
  #### 2.es6的set方法
```js
function distinct6(arr = testArr) {
    return [...new Set(arr)]
}
```

 #### 3.利用indexOf和forEach/for循环去重
 ```js
 function distinct2(arr) {
    let result = [];
    arr.forEach((v, i, array) => {
        array.indexOf(v, i+1) === -1 && result.push(v)
    });
    return result
}
 ```


## 13.浅拷贝和深拷贝
   ### 浅拷贝实现
    1.手写
```js
     function shallowClone(obj) {
         let target = {}
         for (let k in obj) {
             if (obj.hasOwnProperty(k)) {
             target[k] = obj[k]
             }
         }
         return target
     }
```
    2.Object.assign
       Object.assign()方法复制的是源对象的属性值，如果源对象的属性是指向另一个对象的引用，那么它只会复制这个引用值（浅复制），不会深复制这个引用值所引用的对象。
```js
     let newObj = Object.assign({}, obj)
```


   ### 深拷贝实现
    1. JSON.parse( JSON.stringify() ) 序列化和反序列
     缺点:会丢失undefined、function、symbol这三种类型的值。原因是JSON在执行字符串化时，会先进行一个JSON格式化，非安全的JSON值，就会被丢弃掉。
    
    2. 手写
```js
function deepClone1(obj, hash = new WeakMap) {
            if (obj == null) return obj
            if (typeof obj !== 'objcet') return obj
            if (obj instanceof RegExp) return new RegExp(obj)
            if (obj instanceof Date) return new Date(obj)
            if (hash.get(obj)) return hash.get(obj)
            // let res = Array.isArray(obj) ? [] : {}
            let res = new obj.constructor();
            hash.set(obj, res)
            for (let v in obj) {
                if (obj.hasOwnProperty(v)) {
                    res[v] = deepClone(obj[v], hash)
                }
            }
            return res
        }
```



## 14.js延迟加载的几种方式 && 方法 async、defer问题
    ·defer属性、async属性、动态创建dom方式、使用setTimeout让js最后加载。
    ·如果依赖其他脚本和 DOM 结果，使用 defer
    ·如果与 DOM 和其他脚本依赖不强时，使用 async
   ### 一、defer属性
   HTML 4.01为 <script>标签定义了defer属性（延迟脚本的执行）。
    其用途是：表明脚本在执行时不会影响页面的构造，浏览器会立即下载，但延迟执行，即脚本会被延迟到整个页面都解析完毕之后再执行。
   ### 二、async属性
    HTML5为 <script>标签定义了async属性。添加此属性后，脚本和HTML将一并加载（异步），代码将顺利运行。
    浏览器遇到async脚本时不会阻塞页面渲染，而是直接下载然后运行。但这样的问题是，不同脚本运行次序就无法控制，只是脚本不会阻止剩余页面的显示。
   ### 三、动态创建DOM方式
   ```
    var element = document.createElement("script");
    element.src = "xxx.js";
    document.body.appendChild(element); 
   ```




## 16.如何判断是不是一个数组
*typeof千万别写*
```js
1.Array.isArray([]);   //true

2. [].constructor.toString().indexOf("Array")  //9

3. Array.prototype.isPrototypeof([])        //true

4.Object.prototype.toString.call([]).slice(8,-1);  // [Object Array]
```

## 17.**说一下从url输入到返回请求的过程**
   ### 1·DNS解析查找（域名系统，域名和IP地址相互映射的一个分布式数据库）
    1.输入url后，先对url进行解析。
    2.走DNS缓存：
      查找顺序：本地的 hosts 文件  => 本地DNS服务器（中国移动...） => 根域名服务器 => 顶级域名服务器（） => 权威DNS服务器（解析服务器），直到找到IP地址，返回ip，然后把它缓存在本地，供下次使用。

  
   ### 2·浏览器向web服务器发送一个http请求,发起TCP连接
    TCP三次握手，四次挥手
   #### 三次握手（为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误）
    ·第一次握手：
    将标志位SYN置为1，随机产生一个值为seq=J，发送到服务器，并进入SYN_SEND状态，等待服务器确认；
    ·第二次握手：
    收到数据包后由标志位SYN=1知道客户端请求建立连接，
    将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，发送到客户端SYN_RECV状态；
    ·第三次握手：
    客户端收到服务器的SYN＋ACK包（检查ack是否为J+1，ACK是否为1），
    如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发送给服务端，
    发送完毕，客户端和服务器进入  ESTABLISHED状态，完成三次握手。


    握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP 连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP 连接都将被一直保持下去。
   ![tcp三次握手](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\tcp三次握手.png)

   #### 四次挥手
    第一次挥手：Client发送一个FIN，标志位FIN为1,（seq=u），用来关闭Client到Server的数据传送，
    Client进入FIN_WAIT_1状态。

    第二次挥手：Server收到FIN后，发送一个ACK，标志位 ACK 为1给Client（ack=x+1）,
    Server进入CLOSE_WAIT状态。

    第三次挥手：Server发送一个 标志位FIN与标志位ACK为1，（seq=w，ack=u+1）
    用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。

    第四次挥手：Client收到后进入TIME_WAIT状态，
    接着发送一个标志位ACK为1，（seq=u+1,ack=w+1）给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。
   ![tcp四次挥手](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\tcp四次挥手.png)
   
   ##### 为什么客户端最后还要等待2MSL？
    ·第一，保证客户端发送的最后一个ACK报文能够到达服务器，因为这个ACK报文可能丢失，站在服务器的角度看来，我已经发送了FIN+ACK报文请求断开了，客户端还没有给我回应，应该是我发送的请求断开报文它没有收到，于是服务器又会重新发送一次，而客户端就能在这个2MSL时间段内收到这个重传的报文，接着给出回应报文，并且会重启2MSL计时器。
    ·第二，防止类似与“三次握手”中提到了的“已经失效的连接请求报文段”出现在本连接中。客户端发送完最后一个确认报文后，在这个2MSL时间中，就可以使本连接持续的时间内所产生的所有报文段都从网络中消失。这样新的连接中不会出现旧连接的请求报文。

   #### tcp字段
   ![tcp](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\tcp.png)
   
   #### 字段分析：
   · 源端口：源端口和IP地址的作用是标识报文的返回地址。

   · 目的端口：端口指明接收方计算机上的应用程序接口。

   · TCP报头中的源端口号和目的端口号同IP数据报中的源IP与目的IP唯一确定一条TCP连接。

   · 序号：是TCP可靠传输的关键部分。序号是该报文段发送的数据组的第一个字节的序号。在TCP传送的流中，  每一个字节都有一个序号。比如一个报文段的序号为300，报文段数据部分共有100字节，则下一个报文段的序  号为400。所以序号确保了TCP传输的有序性。

   · 确认号：即ACK，指明下一个期待收到的字节序号，表明该序号之前的所有数据已经正确无误的收到。确认号  只有当ACK标志为1时才有效。比如建立连接时，SYN报文的ACK标志位为0。

   · 首部长度/数据偏移：占4位，它指出TCP报文的数据距离TCP报文段的起始处有多远。由于首部可能含有可选  项内容，因此TCP报头的长度是不确定的，报头不包含任何任选字段则长度为20字节，4位首部长度字段所能表  示的最大值为1111，转化为10进制为15，15*32/8=60，故报头最大长度为60字节。首部长度也叫数据偏移，  是因为首部长度实际上指示了数据区在报文段中的起始偏移值。

   · 保留：占6位，保留今后使用，但目前应都位0。

   · 控制位：URG ACK PSH RST SYN FIN，共6个，每一个标志位表示一个控制功能。

   · 紧急URG：当URG=1，表明紧急指针字段有效。告诉系统此报文段中有紧急数据

   · 确认ACK：仅当ACK=1时，确认号字段才有效。TCP规定，在连接建立后所有报文的传输都必须把ACK置1。

   · 推送PSH：当两个应用进程进行交互式通信时，有时在一端的应用进程希望在键入一个命令后立即就能收到对  方的响应，这时候就将PSH=1。

   · 复位RST：当RST=1，表明TCP连接中出现严重差错，必须释放连接，然后再重新建立连接。

   · 同步SYN：在连接建立时用来同步序号。当SYN=1，ACK=0，表明是连接请求报文，若同意连接，则响应报文  中应该使SYN=1，ACK=1。

   · 终止FIN：用来释放连接。当FIN=1，表明此报文的发送方的数据已经发送完毕，并且要求释放。




窗口：滑动窗口大小，用来告知发送端接受端的缓存大小，以此控制发送端发送数据的速率，从而达到流量控制。窗口大小时一个16bit字段，因而窗口大小最大为65535。


校验和：奇偶校验，此校验和是对整个的 TCP 报文段，包括 TCP 头部和 TCP 数据，以 16 位字进行计算所得。由发送端计算和存储，并由接收端进行验证。


紧急指针：只有当 URG 标志置 1 时紧急指针才有效。紧急指针是一个正的偏移量，和顺序号字段中的值相加表示紧急数据最后一个字节的序号。 TCP 的紧急方式是发送端向另一端发送紧急数据的一种方式。


选项和填充：最常见的可选字段是最长报文大小，又称为MSS（Maximum Segment Size），每个连接方通常都在通信的第一个报文段（为建立连接而设置SYN标志为1的那个段）中指明这个选项，它表示本端所能接受的最大报文段的长度。选项长度不一定是32位的整数倍，所以要加填充位，即在这个字段中加入额外的零，以保证TCP头是32的整数倍。


数据部分： TCP 报文段中的数据部分是可选的。在一个连接建立和一个连接终止时，双方交换的报文段仅有 TCP 首部。如果一方没有数据要发送，也使用没有任何数据的首部来确认收到的数据。在处理超时的许多情况中，也会发送不带任何数据的报文段。


   ### 3·发送HTTP请求
   ！！！HTTP的端口为80/8080，而HTTPS的端口为443
   发送HTTP请求的过程就是构建HTTP请求报文并通过TCP协议中发送到服务器指定端口 请求报文由请求行，请求抱头，请求正文组成。
  ·请求行：
   请求行的格式为：Method  Request-URL  HTTP-Version   CRLF eg: GET index.html  HTTP/1.1 
   常用的方法有: GET, POST, PUT, DELETE, OPTIONS, HEAD。
    **http请求信息：**
    ·请求方法 URL 协议/版本
    ·请求头(Request Header)
    ·请求正文
    
   #### HTTP缓存
    ·优点：
        1.减少了冗余的数据传递，节省宽带流量
        2.减少了服务器的负担，大大提高了网站性能
        3.加快了客户端加载网页的速度 这也正是HTTP缓存属于客户端缓存的原因。
    ·HTTP属于客户端缓存，我们常认为浏览器有一个缓存数据库，用来保存一些静态文件
    ·缓存的规则：分为强制缓存和协商缓存（强制缓存的优先级高于协商缓存，若两种皆存在，且强制缓存命中目标，则协商缓存不再验证标识。）
        ·强制缓存
        当缓存数据库中有客户端需要的数据，客户端直接将数据从其中拿出来使用（如果数据未失效），当缓存服务器没有需要的数据时，客户端才会向服务端请求。
        对于强制缓存，服务器响应的header中会用两个字段来表明—— Expires 和 Cache-Control（中的max-age属性）。
    
        ·协商缓存
        又称对比缓存。客户端会先从缓存数据库拿到一个缓存的标识，然后向服务端验证标识是否失效，如果没有失效服务端会返回304，这样客户端可以直接去缓存数据库拿出数据，如果失效，服务端会返回新的数据
        对于协商缓存来说，介绍它的两种缓存方案：
            ·Last-Modified（服务器在响应请求时，会告诉浏览器资源的最后修改时间。）
                属性：if-Modified-Since:浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间。服务端收到此请求头发现有if-Modified-Since，则与被请求资源的最后修改时间进行对比，如果一致则返回304和响应报文头，浏览器只需要从缓存中获取信息即可。
    
            ·Etag（服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定））


   #### —-扩展知识—-
    1.301和302的区别。
    301和302状态码都表示重定向，就是说浏览器在拿到服务器返回的这个状态码后会自动跳转到一个新的URL地址，这个地址可以从响应的Location首部中获取（用户看到的效果就是他输入的地址A瞬间变成了另一个地址B）——这是它们的共同点。
    301表示旧地址A的资源已经被永久地移除了（这个资源不可访问了），搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址；
    302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B，搜索引擎会抓取新的内容而保存旧的网址。SEO302好于301
   
   ### 4·服务器处理请求
        返回带有html代码
   
   ### 5.服务器返回一个 HTTP 响应
        HTTP响应与HTTP请求相似，HTTP响应也由3个部分构成，分别是：
            ·状态行（协议版本 /n 数字形式的状态代码 /n 相应的状态描述）
            ·响应头(Response Header)
            ·响应正文
   
   ### 6·浏览器解析渲染页面(解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树)
   过程：
        ·解析HTML形成DOM树
        ·解析CSS形成CSSOM 树
        ·合并DOM树和CSSOM树形成渲染树
        ·浏览器开始布局render树
        ·浏览器开始绘制render树
        ·页面在首次加载时必然会经历reflow和repain：（重绘不一定回流，回流一定会重绘）
            回流：当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程。
            重绘：当页面中元素样式的改变并不影响它在文档流中的位置时(color、background-color),浏览器会将新样式赋予给元素并重新绘制它。

   ### 7.浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）
    其实这个步骤可以并列在步骤8中，在浏览器显示HTML时，它会注意到需要获取其他地址内容的标签。这时，浏览器会发送一个获取请求来重新获得这些文件。比如我要获取外图片，CSS，JS文件等，类似于下面的链接：

   ### 8·连接结束


## 18.浏览器事件循环
1.Js在执行一段代码时候 首先会在*主进程创建一个执行栈* 然后*创建一个上下文*push到执行栈。当函数执行的时候，也创建一个上下文push到执行栈，当执行栈执行完成后，就会从栈中弹出。遇到*异步任务进入Event Table*并注册函数。当指的事情完成时，*Event Table会将这个函数移入Event Queue（事件队列）*。
2.*同步任务*会在调用栈中*按照顺序*等待主线程依次执行，异步任务会在同步任务执行完，调用栈被清空后，从 Event Queu读取到执行栈执行。
3.异步任务又有*宏任务和微任务*。当同步任务执行完，会查看有没有微任务，如果有，从微任务队列中读取*执行完的所有微务*。当所有微任务执行完毕后，开始*执行宏任务*，*每完成一个宏任务*，浏览器都会*重新看一下有没有新的微任务产生*，如果执行微任务，没有执行下一个宏任务。
4.依照此循环运作

*微任务包含：*
Promise.then
Object.observe
MutationObserver
process.nextTick(Node.js 环境)

*宏任务包含：*
script(整体代码)
setTimeout
setInterval
I/O
UI交互事件
postMessage
MessageChannel
setImmediate(Node.js 环境)


## 19.手写 Promise
```js
const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('类型错误'))
    }

    let called = false
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            const then = x.then
            if (typeof then === 'function') {
                the.call(x,
                    (y) => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    (x) => {
                        if (called) return
                        called = true
                        reject(x)
                    }
                )
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        } 
    }else {
        if (called) return
        called = true
        resolve(x)
    }
}
class promise {
    constructor(executor) {
        // 默认的状态
        this.status === PENDING
        // 成功的结果
        this.value = undefined
        // 失败的原因
        this.reason = undefined
        this.onFulfilledCallback = []
        this.onRejectedCallback = []
        const resolve = (value) => {
            // 保证状态为pending时才执行下去，已经更改过状态(RESOLVE,REJECT)，就无法再改变状态，具有唯一性。
            if (this.status === PENDING) {
                this.status === RESOLVE
                this.value = value
                //调用resolve时遍历函数
                this.onFulfilledCallback.forEach(cb => cb)
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status === REJECT
                this.reason = reason
                this.onRejectedCallback.forEach(cb => cb)
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled =(v)=>v
        }
        if (typeof onRejected !== 'function') {
            onRejected = (err) => {
                throw err
            }
        }
        const promise2 = new Promise((resolve, reject) => {
            // onFulfilled 是成功时你传入的处理函数
            // onRejected 是失败时你传入的处理函数
            if (this.status === RESOLVE) {
                queueMicrotask(() => {
                    try {
                        //如果状态为resolve，则在then中调用onFulfilled方法操作之前保存的成功时的value
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === REJECT) {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            //处理当有定时器等异步操作时，then处于pending状态，将此状态下的onFulfilled, onRejected的函数调用分别保存到onFulfilledCallback，onRejectedCallback数组中，定时器完成时从数组中取出运行onFulfilled, onRejected函数
            if (this.status === PENDING) {
                this.onFulfilledCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                    this.onRejectedCallback.push(() => {
                        queueMicrotask(() => {
                            try {
                                const x = onRejected(this.reason)
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        })
                    })
                })
            }
        })
        return promise2
    }
}
```

## 19.5 Promise.resolve 和 Promise.reject
*Promsie.resolve(value)* 可以将任何值转成值为 value 状态是 fulfilled 的 Promise，但如果传入的值本身是 Promise 则会原样返回它。
```js
Promise.resolve = function(value) {
    // 如果是 Promsie，则直接输出它
    if(value instanceof Promise){
        return value
    }
    return new Promise(resolve => resolve(value))
}
```

*Promise.reject*
和 Promise.resolve() 类似，Promise.reject() 会实例化一个 rejected 状态的 Promise。但与 Promise.resolve() 不同的是，如果给 Promise.reject() 传递一个 Promise 对象，则这个对象会成为新 Promise 的值。
```js
Promise.reject = function(reason) {
    return new Promise((resolve, reject) => reject(reason))
}
```

## 20.手写 Promise.all 和 Promise.race
  ### Promise.all: 
  传入的所有Promise最终都转化为fulfilled态时，则会执行resolve回调，并将返回值是的所有的 Promise 的resolve的回调的value的数组。其中一个任何Promise为reject状态时，则返回的Promise的状态更改为rejected。
  ```js
  function myAll(arr) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(arr)) { return reject(new Error('请输入数组')) }
            const len = arr.length
            let count = 0
            let result = []
            for (let i = 0; i < len; i++) {
                Promise.resolve(arr[i]).then((val, reason) => {
                    result[i] = val
                    count++
                    if (count === len) {
                        resolve(result)
                    }
                }).catch(err => reject(err))
            }
        })
  ```
### Promise.race: 传入的所有Promise其中任何一个有状态转化为fulfilled或者rejected，则将执行对应的回调。
```js
 function race(arr) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(arr)) { return reject(new Error('请输入数组')) }
            for (let i = 0; i < arr.length; i++) {
                Promise.resolve(arr[i]).then((val) => {
                    resolve(val)
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
```


## 21.手写 filter,Map,Reduce 方法
   ### filter
```js
Array.prototype.myFilter = function (fn) {
        if (!Array.isArray(this) || !this.length || typeof fn !== 'function') {
            return []
        } else {
            let res = []
            for (let i = 0; i < this.length; i++) {
                if (fn(this[i], i, this)) {
                    res.push(this[i])
                }
            }
            return res
        }
    }
```

   ### map 
```js
   Array.prototype.myMap = function (fn) {
        if (!Array.isArray(this) || !this.length || typeof fn !== 'function') {
            return []
        } else {
            let res = []
            for (let i = 0; i < this.length; i++) {
                res[i] = fn(this[i], i, this)
            }
            return res
        }
    }
```

   ### reduce
```js
    Array.prototype.myReduce = function (fn, initVal) {
        if (!Array.isArray(this) || !this.length || typeof fn !== 'function') {
            return []
        } else {
            //如果给了初始参数，就将循环的第一项设为 初始参数，如果没有，将其设为数组的第一项当做循环的起始
            let res = initVal ? initVal : this[0]
            // 初始参数 ？ index 设置为0，从数组第一项开始遍历操作  ：一开始就将数组第一项作为起始
            let index = initVal ? 0 : 1
            for (let i = index; i < this.length; i++) {
                res = fn(res, this[i], i, this)
            }
            return res
        }
    }
```


## 22.find和filter有什么不同
find 返回的是匹配到的第一个值
filter 返回的是符合要求的所有值的一个数组

## 23.手写 typeof 与 instanceof
   ### typeof(不要用来测 null与Array，null 是 Object，然后数组也是Object)
```js
function Mytypeof(obj) {
        const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        const map = new Map()
        map.set('number', true)
        map.set('string', true)
        map.set('boolean', true)
        map.set('function', true)
        map.set('undefined', true)
        map.set('symbol', true)
        return map.get(type) ? type : 'Object'
    }
```
   ### instanceof
```js
function _instanceof(A, B) {
    var O = B.prototype;// 取B的显示原型
    A = A.__proto__;// 取A的隐式原型
    while (true) {
        //Object.prototype.__proto__ === null
        if (A === null)
            return false;
        if (A === O)// 这里重点：当 O 严格等于 A 时，返回 true
            return true;
        A = A.__proto__;
    }
}

```

## 23.JS 数据类型
Number,Boolean,String,null,undefined,Symbol,Object(array,function), bigInt(ES2020)

## 24.JS 整数是怎么表示的？Number()的存储空间是多大？如果后台发送了一个超过最大自己的数字怎么办
·通过 Number 类型来表示，遵循 IEEE754 标准，通过 64 位来表示一个数字，（1 + 11 + 52），最大安全数字是 Math.pow(2, 53) - 1，对于 16 位十进制。（符号位 + 指数位 + 小数部分有效位）

·Math.pow(2, 53) ，53 为有效数字，会发生截断，等于 JS 能支持的最大数字。

## 25.事件是如何实现的？on-事件 和 addEventListener的不同
·基于发布订阅模式，就是在浏览器加载的时候会读取事件相关的代码，但是只有实际等到具体的事件触发的时候才会执行。
·比如点击按钮，这是个事件（Event），而负责处理事件的代码段通常被称为事件处理程序(Event Handler)。

·给一个 dom 绑定一个 onclick,如果再给这个 dom 添加一个 onclick,后面的会覆盖前面的,同一个事件只能有一个处理程序。取消事件 =>(dom.onclick = null)
·通过 addEventListener 注册 click 事件,再给这个 dom 添加一个 addEventListener(click)，可以重复，一个事件可以有多个事件处理程序，按顺序执行。捕获事件和冒泡事件通过 removeEventListener 来删除事件

## 26.什么是作用域？什么是作用域链？
 作用域*负责收集和维护*由*所有声明的标识符（变量）*，确定*当前执行的代码*对这些*标识符的访问权限*。
 （作用域 指程序中定义变量的区域，它决定了当前执行代码对变量的访问权限。）
·ES5 中只存在两种作用域：全局作用域和函数作用域。
 ES6 中有块级作用域(let const)

·作用域链就是从当前作用域开始一层一层向上寻找某个变量，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链。

## 27.如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
 不会继承，因为根据 this 绑定四大规则，new 绑定的优先级高于 bind 显示绑定，通过 new 进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，作为此函数的 this，并且在此函数没有返回对象的情况下，返回这个新建的对象


## 28.JS用 FileReader 对象读取blob对象二进制数据
使用FileReader对象，web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容，可以使用File对象或者Blob对象来指定所要处理的文件或数据
  ### 1.创建实例
```js
  var reader = new FileReader();
```
  ### 2.方法
  方法定义	                                 描述
  abort():void	                            终止文件读取操作
  readAsArrayBuffer(file):void	            异步按字节读取文件内容，结果用ArrayBuffer对像表示
  readAsBinaryString(file):void	            异步按字节读取文件内容，结果为文件的二进制串
  readAsDataURL(file):void	                异步读取文件内容，结果用data:url的字符串形式表示
  readAsText(file,encoding):void	        异步按字符读取文件内容，结果用字符串形式表示

  ### 3.事件
  事件名称	        描述
  onabort	        当读取操作被中止时调用
  onerror	        当读取操作发生错误时调用
  onload	        当读取操作成功完成时调用
  onloadend	        当读取操作完成时调用,不管是成功还是失败
  onloadstart	    当读取操作将要开始之前调用
  onprogress	    在读取数据过程中周期性调用





## 29.JS继承的圣杯模式
    ```js
    const inherit =(function(){
        const F = function(){}
        return function(target,origin){
            F.prototype = origin.prototype;
            target.prototype = new F();
            target.prototype.constructor = target
           // target.prototype.super_class = origin //可以看情况加，用于知道继承了谁
        }
    })()
    ```

## 30.npm install原理图
![npm install原理图](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\npm_install原理图.png)

## 31.this是什么？
### 当前执行上下文的一个属性，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值。
首先：有隐式绑定、显式绑定、new 绑定和 window 绑定
在函数内部，this的值取决于函数被调用的方式。
   ### 1. 箭头函数(this是继承自父执行上下文！)
    箭头函数排在第一个是因为它的 this 不会被改变，创建时就确定。
    箭头函数的 this 是在创建它时外层 this 的指向。这里的重点有两个：
        1.创建箭头函数时，就已经确定了它的 this 指向。
        2.箭头函数内的 this 指向外层的 this。
   ### 2. new
    当使用 new 关键字调用函数时，函数中的 this 一定是 JS 创建的新对象。
    （箭头函数不能当做构造函数，所以不能与 new 一起执行。）
   ### 3.多次 bind 时只认第一次 bind 的值
    !!! 易错点
```js
    function func() {
      console.log(this)
    }
    
    func.bind(1).bind(2)()     // 1
```
    !!! 箭头函数中 this 不会被修改
```js
        func = () => {
          // 这里 this 指向取决于外层 this
          console.log(this)
        }
        func.bind(1)()          // Window
```
   ### 4. apply 和 call
    apply() 和 call() 的第一个参数都是 this，区别在于通过 apply 调用时实参是放到数组中的，而通过 call 调用时实参是逗号分隔的。
   ### 5. 直接调用
    在函数不满足前面的场景，被直接调用时，this 将指向全局对象。在浏览器环境中全局对象是 Window，在 Node.js 环境中是 Global。





## 32.**原型、原型链**(高频)
·原型: 对象中固有的__proto__属性，该属性指向构造函数的prototype原型属性。
·原型链: 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是Object.prototype所以这就是我们新建的对象为什么能够使用toString()等方法的原因。

*什么是原型链？*
当对象查找一个属性的时候，如果没有在自身找到，那么就会查找自身的原型，如果原型还没有找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。
这种通过 通过原型链接的逐级向上的查找链被称为原型链
*什么是原型继承？*
一个对象可以使用另外一个对象的属性或者方法，就称之为继承。具体是通过将这个对象的原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法了。


*Function 和 Object是相互继承的*
![function和object是相互继承的](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\function和object是相互继承的.png)
```js
Function.prototype.__proto__ === Object.prototype;//true
Object.__proto__ === Function.prototype;//true
Object.prototype.__proto__ === null;
```

## 34.原生ajax
```js
const xhr = new XMLHttpRequest()
xhr.open('get', url, true)
xhr.onreadystatechange = function () {
  if(xhr.readyState !== 4) {
    return  false
  }
  if(xhr.status >= 200 && xhr.status < 300) {
    console.log(xhr.responseText)
  }
}
xhr.send(null)
```
ajax是一种异步通信的方法,从服务端获取数据,达到局部刷新页面的效果。
过程：
    ·创建XMLHttpRequest对象;
    ·调用open方法传入三个参数 请求方式(GET/POST)、url、同步异步(true/false);
    ·监听onreadystatechange事件，当readystate等于4时返回responseText;
    ·调用send方法传递参数。

### ajax 的 readyState 有哪几个状态，含义分别是什么？
5 个状态，分别是 0-4
0: 还没调用open方法
1: 未调用send方法，也就是还没发送数据给服务器
2: 还没有接收到响应
3: 开始接收到了部分数据
4: 接收完成，数据可以在客户端使用了

## 35.js 去除小数点，保留位数
向上取整  Math.ceil(3.14159) => 4
向下取整  Math.floor(3.14159) => 3
四舍五入  Math.round(3.14159) => 3
// 如果去零时需要保留位数： （比如 19.520100 --> 19.52）
parseFloat(Number(19.520100).toFixed(2))

// 如果只想去除小数点后多余的0 （比如 18.2300 -->  18.23）
parseFloat(arg)

## 36.**JS常用7种继承方案**
   ### 1.原型链继承 
   缺点：原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。因为实例的对引用类型都是通过 prototype 继承来的
```js
function SuperType (){
    this.property = true;
}
SuperType.prototype.getSuperValue= function (){
    return this.property;
}

function SubType (){
    this.Subproperty = false;
}
// 将父类的实例 赋给继承者的原型
SubType.prototype = new SuperType();
//会覆盖之前的相同名字原型
SuperType.prototype.getSubValue= function (){
    return this.Subproperty;
}

const Instance = new SubType();
console.log(Instance.getSuperValue()) //true

```

   ### 2.盗用构造函数继承 
   ·实例拥有自己的属性，不会混淆
   缺点：
   ·只能继承父类的实例即构造函数里的属性和方法，不能继承原型上的属性/方法
   ·无法实现复用，每个子类都有父类实例函数的副本，影响性能
```js
function  SuperType(){
    this.color=["red","green","blue"];
}

function SubType (){
    SuperType.call(this)
}

const instance1 = new SubType();
instance1.color.push('black')
console.log(instance1.color)    //["red","green","blue","black"];

const instance2 = new SubType();
console.log(instance2.color)    //["red","green","blue"];
```

   ### 3.原型式继承 
   缺点：
    ·原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
    ·无法传递参数
   ```js
       function object (obj) {
        function F(){}
        F.prototype = obj
        return new F()
    }

  // object()对传入其中的对象执行了一次浅复制，将构造函数F的原型直接指向传入的对象。
    var person = {
      name: "Nicholas",
      friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = object(person);

   ```


   ### 4.组合式继承 （对于盗用构造函数继承+原型链继承）
   常用的继承方式，不过会调用构造函数两次
```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name,age){
     // 继承属性
    SuperType.call(this,name);
    this.age=age
}
//  将子类的实例赋给父类的原型
SubType.prototype = new SuperType();
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

   ### 5.寄生式继承 
```js
function createAnother(original){
    const clone = Object.create(original)  // 通过调用 object() 函数创建一个新对象
    clone.sayHi = function(){       // 以某种方式来增强对象
        console.log('hello')
    }
    return clone                    // 返回这个对象
}
```
```js
函数的主要作用是为构造函数新增属性和方法，以增强函数
    var person = {
      name: "Nicholas",
      friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi(); //"hi"
```
缺点（同原型式继承）：
        ·原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
        ·无法传递参数


   ### 6.寄生组合式继承 
   结合借用构造函数传递参数和寄生模式实现继承，这是最成熟的方法，也是现在库实现的方法
   这个例子的高效率体现在它只调用了一次SuperType构造函数，并且因此避免了在SubType.prototype上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用instanceof和isPrototypeOf()
```js

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
    SuperType.call(this.name)
  this.age = age;
}

 function inheritPrototype(subType, superType){
  var ptype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  subType.prototype = ptype;                      // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
}

// 调用函数（盗用构造函数方式）将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 像寄生式组合一样新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

```

   ### 7.ES6类继承 
```js
class Point {
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x,y);
        this.color = color
    }
}
```



## 37.设计和实现一个 LRU (最近最少使用) 缓存机制。
```js
class LRU {
        //capacity :  缓存的容量
        constructor(capacity) {
            this.capacity = capacity;
            this.map = new Map()
        }
        /*
        *  get: 你每当获取即使了这个数，就将它从 map中移到最后，即代表最新使用，
        */
        get(key) {
            let val = this.map.get(key);
            if (val === "undefined") return -1;
            this.map.delete(key);
            this.map.set(key, val)
        }
        /*
        *  put: 第一步 如果 map 中已经存在这个数，就将它删除，
        *       第二步 将这个数储存到map中
        *       第三步 capacity为你设置的容量，判断 map 中储存的数量是否超过了容量，如果是则通过*       while循环 this.map.keys().next().value删除开头的值        
        */
        put(key, val) {
            if (this.map.has(key)) {
                this.map.delete(key);
            }
            this.map.set(key, val)
            let keys = this.map.keys()
            while (this.capacity < this.map.size) {
                this.map.delete(keys.next().value)
            }
        }
    }
```

## 38.for in(缺陷是什么)和for of的区别
| 比较   | for in                 | for of               |
| ------ | ---------------------- | -------------------- |
|        | 可以遍历普通对象       | 不能遍历普通对象     |
|        | 遍历出数组的原型对象   | 不会遍历出原型对象   |
|        | 可以遍历出数组自身属性 | 不会遍历自身属性     |
| 不同点 | 遍历出来的值是 key     | 遍历出来的值是 value |
|        | 不可以遍历 map/set     | 可以遍历 map/set     |
|        | 不可以迭代 generators  | 可以迭代generators   |
|        | IE 支持                | IE 不支持            |
|        |                        |                      |
| 相同点 | 可以遍历数组           | 可以遍历数组         |
|        | 可以 break 中断遍历    | 可以 break 中断遍历  |

 for in有什么缺陷？
    1.会遍历到对象中所有可枚举的属性方法，我们给对象添加的方法默认也是可枚举的；
    2.不可以遍历 map/set
    3.不可以迭代 generators 


## 39.for of可以遍历对象吗？怎么让它能遍历
 ### for ... of 只能遍历带有 Symbol.iterator 的数据类型
    而对于不带有Symbol.iterator的数据类型, 控制台便会给出错误 Uncaught TypeError: xxx is not iterable

 ### 怎么让 for ... of能遍历对象?
     只要向 Object的原型上写一个 Symbol.iterator 就行了
```js
Object.prototype[Symbol.iterator] = function() {
    const keys = Reflect.ownKeys(this)
    let pointer = 0
    // 返回遍历器对象
    return {
        next: () => pointer < keys.length ? { value: this[keys[pointer++]] } : { done: true },
        return: () => ({ done: true })
    }
}
```
    ·Reflect.ownKeys 获取对象的所有属性(包括 Symbol), Object.keys()不能获取到Symbol
    ·要通过this获取实例对象，所以用 function 而没有使用箭头函数
    ·定义了一个 pointer 指针, 每次 for...of 遍历时, next函数都会执行, 返回目标值, 由于我们自定义了遍历器, 所以可以返回任何你想要的值
    ·遍历器返回的对象 next 函数是必须的, 不断调用该方法，依次指向数据结构中的每个成员，每次调用之后，对指针加一，向后移动一位，直至完成便遍历操作
    ·return函数在遍历结束会触发 ，return()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句）,就会调用return()方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。

## 40.Object.prototype.toString.call()
```js
console.log(Object.prototype.toString.call("this"));             //[object String]
console.log(Object.prototype.toString.call(12));                 //[object Number]
console.log(Object.prototype.toString.call(true));               //[object Boolean]
console.log(Object.prototype.toString.call(undefined));          //[object Undefined]
console.log(Object.prototype.toString.call(null));               //[object Null]
console.log(Object.prototype.toString.call({name: "this"}));     //[object Object]
console.log(Object.prototype.toString.call(function(){}));      //[object Function]
console.log(Object.prototype.toString.call([]));                //[object Array]
console.log(Object.prototype.toString.call(new Date));          //[object Date]
console.log(Object.prototype.toString.call(/\d/));              //[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));        //[object Object]
```

## 41.闭包的应用场景
*单例模式*
单例模式是一种常见的涉及模式，它保证了一个类只有一个实例。实现方法一般是先判断实例是否存在，如果存在就直接返回，否则就创建了再返回。单例模式的好处就是避免了重复实例化带来的内存开销：
```js
// 单例模式
function Singleton(){
  this.data = 'singleton';
}

Singleton.getInstance = (function () {
  var instance;
    
  return function(){
    if (instance) {
      return instance;
    } else {
      instance = new Singleton();
      return instance;
    }
  }
})();

var sa = Singleton.getInstance();
var sb = Singleton.getInstance();
console.log(sa === sb); // true
console.log(sa.data); // 'singleton'
```

*模拟私有属性*
javascript 没有 java 中那种 public private 的访问权限控制，对象中的所用方法和属性均可以访问，这就造成了安全隐患，内部的属性任何开发者都可以随意修改。虽然语言层面不支持私有属性的创建，但是我们可以用闭包的手段来模拟出私有属性：
```js
// 模拟私有属性
function getGeneratorFunc () {
  var _name = 'John';
  var _age = 22;
    
  return function () {
    return {
      getName: function () {return _name;},
      getAge: function() {return _age;}
    };
  };
}

var obj = getGeneratorFunc()();
obj.getName(); // John
obj.getAge(); // 22
obj._age; // undefined
```

*柯里化*
柯里化（currying），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
这个概念有点抽象，实际上柯里化是高阶函数的一个用法，javascript 中常见的 bind 方法就可以用柯里化的方法来实现：
```js
Function.prototype.myBind = function (context = window) {
    if (typeof this !== 'function') throw new Error('Error');
    let fn = this;
    let args = [...arguments].slice(1);
    
    return function F () {
        // 因为返回了一个函数，可以 new F()，所以需要判断
        if (this instanceof F) {
            return new fn(...args, arguments);
        } else  {
            // bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以需要将两边的参数拼接起来
            return fn.apply(context, args.concat(arguments));
        }
    }
}
```
柯里化的优势之一就是 参数的复用，它可以在传入参数的基础上生成另一个全新的函数，来看下面这个类型判断函数：
```js
function typeOf (value) {
    return function (obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Boolean]'	 : 'boolean',
            '[object Number]' 	 : 'number',
            '[object String]' 	 : 'string',
            '[object Function]'  : 'function',
            '[object Array]'     : 'array',
            '[object Date]'      : 'date',
            '[object RegExp]'    : 'regExp',
            '[object Undefined]' : 'undefined',
            '[object Null]'      : 'null',
            '[object Object]' 	 : 'object'
        };
        return map[toString.call(obj)] === value;
    }
}

var isNumber = typeOf('number');
var isFunction = typeOf('function');
var isRegExp = typeOf('regExp');

isNumber(0); // => true
isFunction(function () {}); // true
isRegExp({}); // => false
```
通过向 typeOf 里传入不同的类型字符串参数，就可以生成对应的类型判断函数，作为语法糖在业务代码里重复使用。



## 42.阻止事件冒泡和阻止默认行为 
```js
<!-- 阻止 事件冒泡的兼容代码，前者是IE，后者是火狐谷歌 -->
e.stopPropagation();
阻止默认行为
<!-- 阻止默认行为，文字拖拽，a标签的自动跳转，右键菜单 -->
e.preventDefault();
```

## 43.实现promise retry重试
```js
function myGetData(promiseFunc, times) {//retry函数
    return new Promise(function (resolve, reject) {
        function attempt() {
            promiseFunc().then((val)=>{
                resolve(val)
                }).catch(function (err) {
                if ( times == 0) {
                    reject(err)
                } else {
                    times--
                    attempt()
                }
            })
        }
        attempt()
    })
}
```

## 44.实现 sleep 函数
```js
function sleep(delay){
    return new Promise((resolve,reject) => {
       setTimeout(()=>{
           resolve()
       },delay)
    })
}
```

## 45.使用setTimeout实现setInterval方法
```js
function mysetinterval(fn,time){
    console.log("利用steTimeout实现setInterval");
    function interval(){//执行该函数，异步被挂起time时间后在执行，一上来就执行fn
        setTimeout(interval,time);//异步
        //好，time时间过去，这个异步被执行，而内部执行的函数正是interval，就相当于进了一个循环，递归
        fn();//同步
    }
    setTimeout(interval,time);//interval被延迟time时间执行
}
```

## 46.模拟实现Array.find()、Array.findIndex()
Array.find()
用于找出第一个符合条件的数组成员，参数为一个回调函数
[1, 4, -5, 10].find((n) => n < 0) // -5
```js
Array.prototype.myFind = function (fn, start = 0, end = this.length) {
    for (let i = start; i < end; i++) {
        if (fn.call(this, this[i], i, this)) {
            return this[i]
        }
    }
}
```
```js
Array.prototype.myFindIndex = function (fn, start = 0, end = this.length) {
    for (let i = start; i < end; i++) {
        if (fn.call(this, this[i], i, this)) {
            return i
        }
    }
    return -1
}
```

## 47.Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
```js
Object.create2 = function(proto, propertyObject = undefined) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null.')
    function F() {}
    F.prototype = proto
    const obj = new F()
    if (propertyObject != undefined) {
        Object.defineProperties(obj, propertyObject)
    }
    if (proto === null) {
        // 创建一个没有原型对象的对象，Object.create(null)
        obj.__proto__ = null
    }
    return obj
}

```

## 48.取得两个数组⾥相同的部分, 并去重
- 取得两个数组⾥相同的部分, 并去重
- 然后按照从⼩到⼤顺序排序, 最后结果返回 (注意, 是返回结果, 不是把结果打印出来)

```js
const arrayA = [4, 2, 1, 2, 5];
const arrayB = [2, 3, 1, 6];
function process(arrayA, arrayB) {
}
应该返回 [1, 2]
```

第一种：
```js
function process(arrayA, arrayB){
  return arrayA
    .filter((v) => arrayB.includes(v))
    .filter((v, i, arr) => arr.indexOf(v) === i )
    .sort((a, b) => a-b);
}
```

第⼆种：
```js
function process(arrayA, arrayB) {
  const set = new Set();
  while(arrayA.length > 0) {
    const ele = arrayA.pop();
    if (arrayB.includes(ele)) {
      set.add(ele);
    }
  }
  return [...set].sort((a,b) => a - b);
}
```

## 49.Promise.all 并发限制
```js
function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }
    function next() {
      let current = count++;
      // 处理边界条件,超过了请求上限
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      fetch(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        });
    }
  });
}

```

## 50.手写trim
```js
function trim(str){
    let len = str.length
    let start = 0,end=0
    for(let i =0; i <len; i++){
        if(str[i]==""){
            start=i
        }
    }
    for(let i =len-1; i>0; i--){
        if(str[i]==""){
           end=i+1
        }
    }
    return str.slice(start,end);
}

```

## 51.数组的常用方法，哪些改变了原数组
改变原数组的
```js
shift unshift push pop splice reverse sort fill
```

不改变原数组的
```js
concat slice
```

## 52.手写 push 方法
```js
    Array.prototype.push1 = function () {
      for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
      }
      return this.length;
    }

```

## 53.Web Workers  JS多线程环境
通过 new Worker(文件) 创建Worker线程，并将任务分配给worker线程
通过 worker.onmessage 与 worker.postMessage 传递信息
```js
// 主线程 index.js

// 传入一个要执行的js文件，实例化Web Worker
// 此时会导致浏览器下载js文件，但不会执行
let worker = new Worker('worderDemo.js')
// 监听Worker传递过来的信息
worker.onmessage = function(event){
   const {data} = event
}
// 监听Worker内部错误
worker.onerror = function(event){
  const {
    filename,  // 文件名
    lineno,    // 代码行数
    message    // 完整的错误信息
  } = event
}
// 给Worker发送消息启动执行
worker.postMessage({
  type:'cmd',
  data:'start'
})
// 停止worker的工作，内部代码会立即停止执行，后续的过程都不会再发生
worker.terminate()



// Web Worker:  worderDemo.js 

// 监听主线程的发送消息
self.onmessage = function(event){
  const {data} = event
  
  self.postMessage({
    type:'end',
    data:'Worker处理完数据了'
  })
}
```

Worker所执行的JavaScript是完全独立的一个作用域，不与页面共享作用域，且Web Worker中的全局对象指向的是worker对象本身，所以this指向worker对象，这里self也引用worker对象。在这个特殊域中，无法访问DOM，也无法通过任何形式影响页面的外观。
注意点：
    ·同源策略：分配给Worker线程运行的脚本文件，必须与主线程的脚本文件同源
    ·脚本限制：不能执行alert()和confirm()方法，但可以使用XMLHTTPRequest
    ·文件限制：Worker无法读取本地文件(file://)，所加载的文件必须来源网络
    ·DOM限制：Worker不能操作Dom，也无法使用window/doument这些，但可以使用navigator等。
    ·通信联系：Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

## 54.函数中的arguments是数组吗？类数组转数组的方法了解一下？
是类数组，是属于鸭子类型的范畴，长得像数组，
    ·... 运算符
    ·Array.from
    ·Array.prototype.slice.apply(arguments)

## 55.typeof String(1) typeof new String(1) 返回值
```js
typeof String(1)        //string
typeof new String(1)   //object
```

## 56.Map和WeakMap的区别
map对key强引用，当map引用了一个key的时候，(内存堆空间的)实际key内容不会被垃圾回收掉。(有内存泄漏风险)
weakmap对key弱引用，实际的key可能在某次垃圾回收操作时被清除掉，导致weakmap中的这对key-value也会消失掉。

引用计数:只要存在计数，就不会被垃圾回收机制回收(垃圾回收)。
强引用：引用并计数，只要引用存在，垃圾回收器永远不会回收。

## 57.service worker 是什么
*一句话概括：*
一个服务器与浏览器之间的中间人角色，如果网站中注册了service worker那么它可以拦截当前网站所有的请求，进行判断（需要编写相应的判断程序），如果需要向服务器发起请求的就转给服务器，如果可以直接使用缓存的就直接返回缓存不再转给服务器。从而大大提高浏览体验。

*以下是一些细碎的描述*
·基于web worker（一个独立于JavaScript主线程的独立线程，在里面执行需要消耗大量资源的操作不会堵塞主线程）
·在web worker的基础上增加了离线缓存的能力
·本质上充当Web应用程序（服务器）与浏览器之间的代理服务器（可以拦截全站的请求，并作出相应的动作->由开发者指定的动·作）
·创建有效的离线体验（将一些不常更新的内容缓存在浏览器，提高访问体验）
·由事件驱动的,具有生命周期
·可以访问cache和indexDB
·支持推送
·并且可以让开发者自己控制管理缓存的内容以及版本
·它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用


## 100.generator函数(迭代函数—不常用)
  ### 基本用法
generator函数跟普通函数在写法上的区别就是，多了一个星号*，并且只有在generator函数中才能使用yield，什么是yield呢，他相当于generator函数执行的中途暂停点，比如下方有3个暂停点。而怎么才能暂停后继续走呢？那就得使用到next方法，next方法执行后会返回一个对象，对象中有value 和 done两个属性

value：暂停点后面接的值，也就是yield后面接的值
done：是否generator函数已走完，没走完为false，走完为true
```js
function* gen() {
  yield 1
  yield 2
  yield 3
}
const g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // { value: 3, done: false }
console.log(g.next()) // { value: undefined, done: true }
```
可以看到最后一个是undefined，这取决于你generator函数有无返回值

  ### next函数传参
generator函数可以用next方法来传参，并且可以通过yield来接收这个参数，注意两点

第一次next传参是没用的，只有从第二次开始next传参才有用
next传值时，要记住顺序是，先右边yield，后左边接收参数
```js
function* gen() {
  const num1 = yield 1
  console.log(num1)
  const num2 = yield 2
  console.log(num2)
  return 3
}
const g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next(11111))
// 11111
//  { value: 2, done: false }
console.log(g.next(22222)) 
// 22222
// { value: 3, done: true }
```


# TS
typescript在编译阶段进行类型检查，当类型不合符预期结果的时候则会出现错误提示

## typescript 的数据类型主要有如下：
· boolean（布尔类型）
· number（数字类型）
· string（字符串类型）
· array（数组类型）
· tuple（元组类型）
· enum（枚举类型）
· any（任意类型）
· null 和 undefined 类型
· void 类型
· never 类型
· object 对象类型

## 1.boolean
布尔类型
```js
let flag:boolean = true;
// flag = 123; // 错误
flag = false;  //正确
```

## 2.number
数字类型，和javascript一样，typescript的数值类型都是浮点数，可支持二进制、八进制、十进制和十六进制
```js
let num:number = 123;
// num = '456'; // 错误
num = 456;  //正确
进制表示：
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
```

## 3.string
字符串类型，和JavaScript一样，可以使用双引号（"）或单引号（'）表示字符串
```
let str:string = 'this is ts';
str = 'test';
作为超集，当然也可以使用模版字符串``进行包裹，通过 ${} 嵌入变量

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }`
```

## 4.array
数组类型，跟javascript一致，通过[]进行包裹，有两种写法：
```js
方式一：元素类型后面接上 []

 let arr:string[] = ['12', '23'];
 arr = ['45', '56'];
方式二：使用数组泛型，Array<元素类型>：

let arr:Array<number> = [1, 2];
arr = ['45', '56'];
```

## 5.tuple
元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```js
let tupleArr:[number, string, boolean]; 
tupleArr = [12, '34', true]; //ok
typleArr = [12, '34'] // no ok
赋值的类型、位置、个数需要和定义（声明）的类型、位置、个数一致
```

## 6.enum
enum类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

## 7.any
可以指定任何类型的值，在编程阶段还不清楚类型的变量指定一个类型，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，这时候可以使用any类型

使用any类型允许被赋值为任意类型，甚至可以调用其属性、方法
```js
let num:any = 123;
num = 'str';
num = true;
定义存储各种类型数据的数组时，示例代码如下：
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

## 8.null 和 undefined
在JavaScript 中 null表示 "什么都没有"，是一个只有一个值的特殊类型，表示一个空对象引用，而undefined表示一个没有设置值的变量

默认情况下null和undefined是所有类型的子类型， 就是说你可以把 null和 undefined赋值给 number类型的变量
```js
let num:number | undefined; // 数值类型 或者 undefined
console.log(num); // 正确
num = 123;
console.log(num); // 正确
但是ts配置了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
```

## 9.void
用于标识方法返回值的类型，表示该方法没有返回值。
```js
function hello(): void {
    alert("Hello Runoob");
}
```

## 10.never
never是其他类型 （包括null和 undefined）的子类型，可以赋值给任何类型，代表从不会出现的值
但是没有类型是 never 的子类型，这意味着声明 never 的变量只能被 never 类型所赋值。
never 类型一般用来指定那些总是会抛出异常、无限循环
```js
let a:never;
a = 123; // 错误的写法

a = (() => { // 正确的写法
  throw new Error('错误');
})()

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

## 11.object
对象类型，非原始类型，常见的形式通过{}进行包裹
```js
let obj:object;
obj = {name: 'Wang', age: 25};
```

## 12.泛型的使用(泛型在函数使用时才给定类型，声明函数时不需要用<T>代替,(字母可以换))
    ```js
    function getArr<T>(arr: T[]) {
      return arr;
    }
    
    getArr<number>([1, 2, 3]) //指定了number，那我的数组必须每一项也是number，如果不是就报错
    getArr<string>(['g', 'q', 'f']) 
    
    ```
    
```js
    function getVal<T>(obj: T, k: keyof T){
      return obj[k];
    }
    
    interface Person {
      name: string;
      age: number;
    }
    
    getVal<Person>({
      name: 'gqf',
      age: 29
    }, 'age') // 这里的key值只能传name或者age，否则就会报错，这个就是泛型的力量
    
```
   ### 使用多个泛型
    ```js
    function manyTest<K, V>(a: K, b: V) {
        return `${a} ${b}`
    }
    
    manyTest<number, string>(1, '2') //泛型指定了第一个参数是数字，第二个参数是字符串
    ```
   ### 在类中使用泛型-泛型继承接口了
    ```js
    interface Skill {
        name: string;
        age: number;
    }
    
    // 规定了数组每一项的Skill技能，要遵循接口的格式，有name和age字段
    class DesignHero<T extends Skill> { 
      constructor(private skills: T[]){}
    
      getSkillName (index: number) {
        console.log(this.skills[index].name)
        return this.skills[index].name;
      }
    }
    ```

## 总结
和javascript基本一致，也分成：
基本类型
引用类型
在基础类型上，typescript增添了void、any、emum等原始类型
