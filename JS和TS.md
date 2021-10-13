# JS
ES6 箭头函数时的this在定义时就绑定了
## 1.REM适配方案
```
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

window.onresize = adapter
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
window.onresize = adapter
</script>

//CSS样式 ，用less可以方便计算
@font:375/10rem;
.demo {
width:345/@font
}
```

## 2.Fetch API 基本用法

(注意第一个then返回promise对象)

```
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


## 3.说说bind、call、apply 区别？手写它们
都是改变this指向，不过bind返回的是一个函数，而apply和call 直接返回结果。
apply的第二个参数接受的是一个数组，而 call 接受的是参数列表

```
1. Function.prototype.myCall = function (context) {
            var context = context || window
            context.Fn = this
            console.log(context.Fn);
            let args = [...arguments].slice(1)
            const result = context.Fn(...args)
            delete context.Fn
            return result
        }

Function.prototype.myApply = function (context) {
            var context = context || window
            context.Fn = this
            console.log(arguments);
            let result
            if (arguments[1]) {
                if ((arguments[1] instanceof Array)) {
                    result = context.Fn(...arguments[1])
                } else {
                    throw new TypeError('ERROR')
                }
            } else {
                result = context.Fn()
            }
            delete context.Fn
            return result
}

Function.prototype.myBind = function (context, ...args) {
            if (typeof this !== 'function') {
                throw new TypeError('ERROR')
            }
            let self = this
            //bind前后都可以传递参数
            return function F(...arguments) {
                //考虑到bind后返回的函数可以被 new ，所以new后函数的 this 应该指向 new的实例
                if (this instanceof F) {
                    return self.apply(this, [...args, ...arguments])
                }
                return self.apply(context, [...args, ...arguments])
            }
}
```



## 4.防抖节流
防抖：在delay时间后执行，如果在 delay 内再次触发，则重新计时。（取消定时器）
```
function debounce(fn, delay) {
            const timer = 
            return function () {
                let context = this
                clearTimeout(timer)
                timer = setTimeout(() => {
                    fn.apply(context, arguments)
                }
                    , delay)
            }
        }
```

节流：在delay时间后执行，如果在 delay 内再次点击不会触发函数。（判断有定时器时，不会触发函数）
```
function throttle(fn, delay) {
            const timer = null
            return function () {
                let context = this
                if (!timer) {
                    timer = setTimeout(() => {
                        fn.apply(context, arguments)
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
```
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
```
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
```
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
```
let Public = {
            listen: function (key, fn) {
                if (!this.list[key]) {
                    this.list[key] = []
                }
                this.list[key].push(fn)
            },
            trigger: function (key, ...args) {
                let lists = this.list[key]
                for (let fn of lists) {
                    fn.apply(this, ...args)
                }
            },
            list: []
        }
```

## 7. JS的变量提升（预编译）
    Add JS引擎会在正式执行代码, 加载脚本文件，进行语法分析后，会进行一次"预编译"（简单理解就是在内存中开辟一些空间，存放一些变量和函数）
        具体步骤如下（browser）：
        1.页面创建GO全局对象（Global Object）对象（window对象）。
        2.加载第一个脚本文件
        3.进行语法分析。
        4.开始预编译（预编译分为全局预编译和局部预编译，全局预编译发生在页面加载完成时执行，而局部预编译发生在函数执行的前一刻。）
            1.查找变量声明，作为GO属性，值赋予undefined
            2.查找函数声明，作为GO属性，值赋予函数体（函数声明优先）

            ```
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
        5.解释执行代码（直到执行函数b，该部分也被叫做词法分析）
###      局部预编译的4个步骤：
        6.创建AO活动对象（Active Object）
        7.在AO活动对象中进行查找形参和变量声明, 并值赋予undefined
        8.实参值赋给形参
        9.查找函数声明，值赋给函数体
        10.解释执行函数中的代码

## 8.Undefined与Null的区别
 Undefined ：
 1.定义变量但没有赋值
 2.访问对象上不存在的属性或者未定义的变量
 3.函数定义了形参但没有赋值，函数里输出形参为undefined
 4.使用Void（ECMAScript 明确规定 void 操作符 对任何表达式求值都返回 undefined）

 Null：
 1.如果定义的变量在将来用于保存对象，那么最好将该变量初始化为null，而不是其他值。
 2.当一个数据不再需要使用时，通过将其值设置为null来释放其引用（解除引用，让值脱离执行环境，以便垃圾收集器在下次运行时将其回收）

 区别：
 ```
    typeof null; // "object"
    typeof undefined; // "undefined"
 ```
 ```
    !!(null); // false
    !!(undefined); // false
    Number(null); // 0
    Number(undefined); // NaN
    null == undefined; //true
    null === undefined; //false
 ```

## 9.前端性能优化
### .计算性能指标
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
```
    function myNew(fn){
        let obj = Object.create({})
        obj.__proto__ = fn.prototype
        let args =[...Arguments].slice(1)
        const res = fn.apply(obj,args)
        if(Object.prototype.toString.call(res) === '[object Object]'){
            return res
        }
        return obj
    }
```

## 11.闭包
闭包是指有权访问另外一个函数作用域中的变量的函数。持有它的引用。


## 12.数组扁平化（ES6自带和自己实现）
    设定一个多维数组
    ```
    let arr = [1,[2,[3,4],5,],6,7,8,9]
    ```

   ### 一、使用ES6自带的flat（），如果括号里不写默认为1，Infinity代表正无穷，即对多维数组全部拉平
```
let newarr = arr.flat(Infinity)
```

   ### 二、正则表达式改良版
```
let newarr = JSON.parse("["+JSON.stringify(arr).replace(/\[|\]/g, '')+"]")
console.log(newarr);  //[ 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

   ### 三、递归
```
let newarr = []
const fnc = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            fnc(arr[i])
        } else {
            newarr.push(arr[i])
        }
    }
 }
fnc(arr)
console.log(newarr);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```









## 13.浅拷贝和深拷贝
   ### 浅拷贝实现
    1.手写
```
     function shallowClone(obj) {
         let target = {}
         for (k in obj) {
             if (obj.hasOwnProperty(k)) {
             target[k] = obj[k]
             }
         }
         return target
     }
```
    2.Object.assign
       Object.assign()方法复制的是源对象的属性值，如果源对象的属性是指向另一个对象的引用，那么它只会复制这个引用值（浅复制），不会深复制这个引用值所引用的对象。
```
     let newObj = Object.assign({}, obj)
```


   ### 深拷贝实现
    1. JSON.parse( JSON.stringify() ) 序列化和反序列
     缺点:会丢失undefined、function、symbol这三种类型的值。原因是JSON在执行字符串化时，会先进行一个JSON格式化，非安全的JSON值，就会被丢弃掉。

    2. 手写
    ```
    const deepClone = function (obj) {
        if (typeof obj !== 'object') return obj;
        if (obj == null) return;
        if (obj instanceof RegExp) return new RegExp(obj);
        if (obj instanceof Date) return new Date(obj);
    
        //=>不直接创建空对象目的:克隆的结果和之前保持相同的所属类
        let newObj = new obj.constructor
    
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                //Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。
                newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
            }
        }
        return newObj;
    }
    ```



## 14.js延迟加载的几种方式
    js延迟加载的六种方式
　　一般有六种方式；defer属性、async属性、动态创建dom方式、使用jquery的getScript方法、使用setTimeout延迟方法,让js最后加载。
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


## 15.null 和 undefined
   1. null == undefined   //true
    // == 会进行转换 : toString(undefined) => '[object Undefined]'
                      toString(null) => '[object Undefined]' 
   2.null === undefined   //false       
   3.typeof(null)  => Object   //设计师先设计的 null ，认为表示空值的类型不应该是对象，所以又创造了undefined
   3.typeof(undefined)  => undefined  

## 16.如何判断是不是一个数组
```
    typeof千万别写
1.Array.isArray([]);   //true

2. [].constructor.toString().indexOf("Array")  //9

3. Array.prototype.isPrototypeof([])        //true

4.Array.prototype.toString.call([]);  // [Object Array]
```

## 17.说一下从url输入到返回请求的过程

## 18.浏览器事件循环
    1.JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。遇到异步任务会放入任务队列中，先执行同步任务，直到调用栈为空。
    2.同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在调用栈被清空，被读取到栈内等待主线程的执行。
    3.异步任务又有宏认为和微任务。当同步任务执行完，会查看有没有微任务，如果有，从微任务队列中读取执行完的所有微任务。当所有微任务执行完毕后，开始执行宏任务，每完成一个宏任务，浏览器都会重新看一下有没有新的微任务产生，如果有执行微任务，没有执行下一个宏任务。
    4.依照此循环运作



## 19.手写 Promise

## 20.手写 Promise.all
  ### Promise.all: 传入的所有Promise最终都转化为fulfilled态时，则会执行resolve回调，并将返回值是的所有的Promise的resolve的回调的value的数组。其中一个任何Promise为reject状态时，则返回的Promise的状态更改为rejected。
  ```
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
```
 function race(arr) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(arr)) { return reject(new Error('请输入数组')) }
            for (let i = 0; i < arr.length; i++) {
                Promise.resolve(arr[i]).then((val) => {
                    resolve(val)
                }).catch(err => {
                    reject
                })
            }
        })
    }
```


## 21.手写 filter,Map,Reduce 方法
   ### filter
```
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
```
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
```

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
```
let flag:boolean = true;
// flag = 123; // 错误
flag = false;  //正确
```

## 2.number
数字类型，和javascript一样，typescript的数值类型都是浮点数，可支持二进制、八进制、十进制和十六进制
```
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
```
方式一：元素类型后面接上 []

 let arr:string[] = ['12', '23'];
 arr = ['45', '56'];
方式二：使用数组泛型，Array<元素类型>：

let arr:Array<number> = [1, 2];
arr = ['45', '56'];
```

## 5.tuple
元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```
let tupleArr:[number, string, boolean]; 
tupleArr = [12, '34', true]; //ok
typleArr = [12, '34'] // no ok
赋值的类型、位置、个数需要和定义（声明）的类型、位置、个数一致
```

## 6.enum
enum类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

## 7.any
可以指定任何类型的值，在编程阶段还不清楚类型的变量指定一个类型，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，这时候可以使用any类型

使用any类型允许被赋值为任意类型，甚至可以调用其属性、方法
```
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
```
let num:number | undefined; // 数值类型 或者 undefined
console.log(num); // 正确
num = 123;
console.log(num); // 正确
但是ts配置了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
```

## 9.void
用于标识方法返回值的类型，表示该方法没有返回值。
```
function hello(): void {
    alert("Hello Runoob");
}
```

## 10.never
never是其他类型 （包括null和 undefined）的子类型，可以赋值给任何类型，代表从不会出现的值
但是没有类型是 never 的子类型，这意味着声明 never 的变量只能被 never 类型所赋值。
never 类型一般用来指定那些总是会抛出异常、无限循环
```
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
```
let obj:object;
obj = {name: 'Wang', age: 25};
```

## 总结
和javascript基本一致，也分成：
基本类型
引用类型
在基础类型上，typescript增添了void、any、emum等原始类型
