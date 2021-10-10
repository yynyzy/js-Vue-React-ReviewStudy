# JS
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

## 7. JS的变量提升
    Add JS引擎会在正式执行代码, 加载脚本文件，进行语法分析后，会进行一次"预编译"（简单理解就是在内存中开辟一些空间，存放一些变量和函数）
        具体步骤如下（browser）：
        1.页面创建GO全局对象（Global Object）对象（window对象）。
        2.加载第一个脚本文件
        3.脚本加载完毕后，进行语法分析。
        4.开始预编译
        1.查找函数声明，作为GO属性，值赋予函数体（函数声明优先）
        2.查找变量声明，作为GO属性，值赋予undefined
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
