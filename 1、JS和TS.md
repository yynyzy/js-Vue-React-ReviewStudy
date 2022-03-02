## **0.ES6(包括ES7、8、9...)**
·新增symbol类型 表示独一无二的值，用来定义独一无二的对象属性名;

·const/let  都是用来声明变量,不可重复声明，具有块级作用域。存在暂时性死区，也就是不存在变量提升。(const一般用于声明常量);

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

### **ES2016(ES7)**
### Array.prototype.includes()
includes() 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回 false。
语法
```js
arr.includes(valueToFind[, fromIndex])
```
valueToFind，需要查找的元素值。

fromIndex 可选 从fromIndex 索引处开始查找 valueToFind。如果为负值（即从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

示例
```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7')) // true
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes("es7", -1)); // fasle
console.log(arr.includes("es7", -2)); // true
```
*注意点*
·使用 includes()查找字符串是区分大小写的。
·使用 includes()只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的.
```js
const arr = ['es6', ['es7', 'es8'], 'es9',{name:"jimmy"}]
console.log(arr.includes(["es7", "es8"])); // false
console.log(arr.includes({name:"jimmy"})); // false
```
·能识别NaN，indexOf是不能识别NaN的
```js
const arr = ['es6', 'es7', NaN, 'es8']
console.log(arr.includes(NaN)) // true
console.log(arr.indexOf(NaN)) // -1
```
最后，如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用includes(),如果想获取一个值在数组中的位置，那么使用indexOf方法。

### 幂运算符 **
比如我们想求2的10次方:
```js
    console.log(2 ** 10); // 1024
```
幂运算符的两个*号之间不能出现空格，否则语法会报错。

### **ES2017(ES8)**
### Object.values()
Object.values 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'jimmy', 18, 188 ]
```

### Object.entries()
Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。
```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```


### Object.getOwnPropertyDescriptors()
Object.getOwnPropertyDescriptors()  方法用来获取一个对象的所有自身属性的描述符。
```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);  
// 打印结果
{
  name: {
    value: 'jimmy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: { 
   value: 18, 
   writable: true,
   enumerable: true, 
   configurable: true 
  }
}
```

那这些对象的属性我们怎么设置和修改他们呢，我们可以使用es5的 Object.defineProperty()
```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(obj, "age", {
  value: 34,
  writable: true,
  configurable: true,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy', age: 34 }
```


### String.prototype.padStart
把指定字符串填充到字符串头部，返回新字符串。

语法
```js
str.padStart(targetLength [, padString])
```

targetLength
当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

padString 可选
填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

示例
```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```
*应用场景*
日期格式化：yyyy-mm-dd的格式：
```js
const now = new Date()
const year = now.getFullYear()
// 月份和日期 如果是一位前面给它填充一个0
const month = (now.getMonth() + 1).toString().padStart(2, '0')
const day = (now.getDate()).toString().padStart(2, '0')
console.log(year, month, day)
console.log( `${year}-${month}-${day}` ) //输入今天的日期 2021-12-31
```
数字替换(手机号，银行卡号等）
```js
const tel = '18781268679'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel) // *******5678
```

### String.prototype.padEnd
把指定字符串填充到字符串尾部，返回新字符串。
示例
```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```
应用场景
在JS前端我们处理时间戳的时候单位是ms毫秒，但是，后端同学返回的时间戳则不一样是毫秒，可能只有10位，以s秒为单位。所以，我们在前端处理这个时间戳的时候，保险起见，要先做一个13位的补全，保证单位是毫秒。
```js
// 伪代码
console.log(new Date().getTime()) // 时间戳 13位的
timestamp = +String(timestamp).padEnd(13, '0')
```

### 尾逗号 Trailing commas
ES8 允许函数的最后一个参数有尾逗号（Trailing comma）。此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。
```js
function clownsEverywhere(
    param1,
    param2
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar'
)
```
上面代码中，如果在param2或bar后面加一个逗号，就会报错。

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数clownsEverywhere添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接可以加上一个逗号。
```js
function clownsEverywhere(
    param1,
    param2,
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar',
)
```
这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

### async/await
介绍
我们都知道使用 Promise 能很好地解决回调地狱的问题，但如果处理流程比较复杂的话，那么整段代码将充斥着 then，语义化不明显，代码不能很好地表示执行流程，那有没有比 Promise 更优雅的异步方式呢？那就是async/await！我们一起来揭开它神秘的面撒吧！

前面添加了async的函数在执行后都会自动返回一个Promise对象:

假如有这样一个使用场景：需要先请求 a 链接，等返回信息之后，再请求 b 链接的另外一个资源。下面代码展示的是使用 fetch 来实现这样的需求，fetch 被定义在 window 对象中，它返回的是一个 Promise 对象。
```js
fetch('https://blog.csdn.net/')
  .then(response => {
    console.log(response)
    return fetch('https://juejin.im/')
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```
虽然上述代码可以实现这个需求，但语义化不明显，代码不能很好地表示执行流程。基于这个原因，ES8 引入了 async/await，这是 JavaScript 异步编程的一个重大改进，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰。
```js
async function foo () {
  try {
    let response1 = await fetch('https://blog.csdn.net/')
    console.log(response1)
    let response2 = await fetch('https://juejin.im/')
    console.log(response2)
  } catch (err) {
    console.error(err)
  }
}
foo()
```

通过上面代码，你会发现整个异步处理的逻辑都是使用同步代码的方式来实现的，而且还支持 try catch 来捕获异常，这感觉就在写同步代码，所以是非常符合人的线性思维的。

*注意点*
await 只能在 async 标记的函数内部使用，单独使用会触发 Syntax error。

await后面需要跟异步操作，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数。

*async/await的缺陷*
了解Async/await是非常有用的，但还有一些缺点需要考虑。

Async/await 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。 await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞。

这意味着您的代码可能会因为大量await的promises相继发生而变慢。每个await都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理（就像我们没有使用async/await时那样）。

有一种模式可以缓解这个问题——通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕。如果想更加深入的了解，请参考 MDN

### **ES2018(ES9)**
### Object Rest & Spread
在 ES9 新增 Object 的 Rest & Spread 方法，直接看下示例：
```js
const input = {
  a: 1,
  b: 2,
  c: 3,
}

const output = {
  ...input,
  c: 4
}

console.log(output) // {a: 1, b: 2, c: 4}
```
这块代码展示了 spread 语法，可以把 input 对象的数据都拓展到 output 对象，这个功能很实用。需要注意的是，如果存在相同的属性名，只有最后一个会生效。

*注意点*
```js
const obj = { x: { y: 10 } };
const copy1 = { ...obj };
const copy2 = { ...obj };
obj.x.y = "jimmy";
console.log(copy1, copy2); // x: {y: "jimmy"} x: {y: "jimmy"}
console.log(copy1.x === copy2.x); // → true
```
如果属性的值是一个对象的话，该对象的引用会被拷贝，而不是生成一个新的对象。

我们再来看下 Object rest 的示例：
```js
const input = {
  a: 1,
  b: 2,
  c: 3
}

let { a, ...rest } = input

console.log(a, rest) // 1 {b: 2, c: 3}
```
当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。注意，rest 属性必须始终出现在对象的末尾，否则将抛出错误。

### for await of
异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。
我们知道 for...of 是同步运行的，看如下代码
```js
function TimeOut(time){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for (let item of arr) {  
     console.log(Date.now(),item.then(console.log))
    }
}

test()//for of 方法不能遍历异步迭代器，得到的结果并不是我们所期待的
```


ES9 中可以用 for...await...of 的语法来操作
```js
function TimeOut(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}
test()
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```
for await of 环等待每个Promise对象变为resolved状态才进入下一步。所有打印的结果为 2000，1000，3000

### Promise.prototype.finally()
Promise.prototype.finally() 方法返回一个Promise，在promise执行结束时，无论结果是fulfilled或者是rejected，在执行then()和catch()后，都会执行finally指定的回调函数。这为指定执行完promise后，无论结果是fulfilled还是rejected都需要执行的代码提供了一种方式，避免同样的语句需要在then()和catch()中各写一次的情况。
```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        // reject('fail')
    }, 1000)
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
}).finally(() => {
    console.log('finally')
})
```
使用场景
loading关闭

需要每次发送请求，都会有loading提示，请求发送完毕，就需要关闭loading提示框，不然界面就无法被点击。不管请求成功或是失败，这个loading都需要关闭掉，这时把关闭loading的代码写在finally里再合适不过了

### String 扩展
放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义会返回undefined，并且从raw上可获取原字符串。

下面是一个es6 的标签模板 如果对这个语法感到陌生，请参考 标签模板[2]
```js
const foo = (a, b, c) => {
    console.log(a)
    console.log(b)
    console.log(c)
}
const name = 'jimmy'
const age = 18
foo `这是${name},他的年龄是${age}岁` 
```

ES9开始，模板字符串允许嵌套支持常见转义序列，移除对ECMAScript在带标签的模版字符串中转义序列的语法限制。
```js
function foo(a, b, c) {
    console.log(a, b, c)
}
// 在标签函数中使用 
// unicode字符\u{61} 对应的值为 a
// unicode字符\u{62} 对应的值为 b
// \unicode 是一个无效的unicode字符
foo `\u{61} and \u{62}` 
foo `\u{61} and \unicode`  
```
*注意点*
在模板字符串中，如果输入无效的unicode字符，还是会报错。只有在便签模板中 从es9开始才不会报错。
```js
 let string = `\u{61} and \unicode`;
 console.log(string); // Uncaught SyntaxError: Invalid Unicode escape sequence
```

### **ES2019(ES10)**
### Object.fromEntries()
方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。
```js
Object.fromEntries([
    ['foo', 1],
    ['bar', 2]
])
// {foo: 1, bar: 2}
```

案例1：Object 转换操作
```js
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries)
// [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)
// {name: "jimmy", age: 18}
```

案例2：Map 转 Object
```js
const map = new Map()
map.set('name', 'jimmy')
map.set('age', 18)
console.log(map) // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map)
console.log(obj)
// {name: "jimmy", age: 18}
```

案例3：过滤
course表示所有课程，想请求课程分数大于80的课程组成的对象：
```js
const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }
```

案例4：url的search参数转换
```js
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"
// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```

### Array.prototype.flat()
flat()  方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
语法
```js
let newArray = arr.flat([depth])
```
depth 可选
指定要提取嵌套数组的结构深度，默认值为 1。

示例
```js
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());  //  [0, 1, 2, 3, 4]
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));  //  [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// `flat()` 方法会移除数组中的空项:
var arr5 = [1, 2, , 4, 5];
arr5.flat(); // [1, 2, 4, 5]
```

### Array.prototype.flatMap()
flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。

语法
```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```
callback:可以生成一个新数组中的元素的函数，可以传入三个参数：
currentValue:当前正在数组中处理的元素
index:可选 数组中正在处理的当前元素的索引。
array:可选 被调用的 map 数组
thisArg可选:执行 callback 函数时 使用的this 值。

示例
```js
const numbers = [1, 2, 3]
numbers.map(x => [x * 2]) // [[2], [4], [6]]
numbers.flatMap(x => [x * 2]) // [2, 4, 6]
```


### String.prototype.trimStart()
trimStart() 方法从字符串的开头删除空格，trimLeft()是此方法的别名。
```js
let str = '   foo  '
console.log(str.length) // 8
str = str.trimStart() // 或str.trimLeft()
console.log(str.length) // 5
```

### String.prototype.trimEnd()
trimEnd() 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。
```js
let str = '   foo  '
console.log(str.length) // 8
str = str.trimEnd() // 或str.trimRight()
console.log(str.length) // 6
```

### 可选的Catch Binding
在 ES10 之前我们都是这样捕获异常的：
```js
try {
    // tryCode
} catch (err) {
    // catchCode
}
```
在这里 err 是必须的参数，在 ES10 可以省略这个参数：
```js
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```
应用
验证参数是否为json格式:这个需求我们只需要返回true或false，并不关心catch的参数。
```js
const validJSON = json => {
    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}
```

### Symbol.prototype.description
我们知道，Symbol 的描述只被存储在内部的 Description ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：
```js
const name = Symbol('es')
console.log(name.toString()) // Symbol(es)
console.log(name) // Symbol(es)
console.log(name === 'Symbol(es)') // false
console.log(name.toString() === 'Symbol(es)') // true
```
现在可以通过 description 方法获取 Symbol 的描述:
```js
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
```

### JSON.stringify() 增强能力
JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。因为 JSON 都是被编码成 UTF-8，所以遇到 0xD800–0xDFFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。
```js
// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify('\uD83D\uDE0E')) // 打印出笑脸

// 如果我们只去其中的一部分  \uD83D 这其实是个无效的字符串
// 之前的版本 ，这些字符将替换为特殊字符，而现在将未配对的代理代码点表示为JSON转义序列
console.log(JSON.stringify('\uD83D')) // "\ud83d"
```

### 修订 Function.prototype.toString()
以前函数的toString方法来自Object.prototype.toString(),现在的 Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不包含注释、空格等。
```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString()) 
// 打印如下
// function foo() {
//  // es10新特性
//  console.log("imooc");
// }
```
将返回注释、空格和语法等详细信息。

### **ES2020(ES11)**
### 空值合并运算符（Nullish coalescing Operator）
空值合并操作符（ ?? ）是一个逻辑操作符，当左侧的操作数为 null或者undefined时，返回其右侧操作数，否则返回左侧操作数。
```js
const foo = undefined ?? "foo"
const bar = null ?? "bar"
console.log(foo) // foo
console.log(bar) // bar
```
与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如'',0,NaN,false）时。见下面的例子。
```js
const foo = "" ?? 'default string';
const foo2 = "" || 'default string';
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42

```
*注意点*
将 ?? 直接与 AND（&&）和 OR（||）操作符组合使用是不可取的。
```js
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

### 可选链 Optional chaining
介绍
可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为 null 或者 undefined 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。
```js
const user = {
    address: {
        street: 'xx街道',
        getNum() {
            return '80号'
        }
    }
}
```
在之前的语法中，想获取到深层属性或方法，不得不做前置校验，否则很容易命中 Uncaught TypeError: Cannot read property... 这种错误，这极有可能让你整个应用挂掉。
```js
const street = user && user.address && user.address.street
const num = user && user.address && user.address.getNum && user.address.getNum()
console.log(street, num)
```
用了 Optional Chaining ，上面代码会变成
```js
const street2 = user?.address?.street
const num2 = user?.address?.getNum?.()
console.log(street2, num2)
```
```js
let customer = {
  name: "jimmy",
  details: { age: 18 }
};
let customerCity = customer?.city ?? "成都";
console.log(customerCity); // "成都"
```
*注意点*
可选链不能用于赋值
```js
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

### globalThis
在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 window、self 取到全局对象，在 Node.js 中，它们都无法获取，必须使用 global。

在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式和模块环境下，this 会返回 undefined。

以前想要获取全局对象，可通过一个全局函数
```js
const getGlobal = () => {
    if (typeof self !== 'undefined') {
        return self
    }
    if (typeof window !== 'undefined') {
        return window
    }
    if (typeof global !== 'undefined') {
        return global
    }
    throw new Error('无法找到全局对象')
}

const globals = getGlobal()
console.log(globals)
```
现在globalThis 提供了一个标准的方式来获取不同环境下的全局 this  对象（也就是全局对象自身）。不像 window 或者 self 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 globalThis，不必担心它的运行环境。

为便于记忆，你只需要记住，全局作用域中的 this 就是globalThis。以后就用globalThis就行了。

### BigInt
BigInt 是一种内置对象，它提供了一种方法来表示大于 2的53次方 \- 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

使用 BigInt 有两种方式：
```js
方式一：数字后面增加n
const bigInt = 9007199254740993n
console.log(bigInt)
console.log(typeof bigInt) // bigint

// `BigInt` 和 [`Number`]不是严格相等的，但是宽松相等的。
console.log(1n == 1) // true
console.log(1n === 1) // false

// `Number` 和 `BigInt` 可以进行比较。
1n < 2 // ↪ true
2n > 1 // ↪ true
```

```js
方式二：使用 BigInt 函数
const bigIntNum = BigInt(9007199254740993n)
console.log(bigIntNum)
```

运算
```js
let number = BigInt(2);
let a = number + 2n; // 4n
let b = number * 10n; // 20n
let c = number - 10n; // -8n
console.log(a);
console.log(b);
console.log(c);
```

*注意点*
BigInt不能用于 [Math] 对象中的方法；不能和任何 [Number] 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 BigInt 变量在转换成 [Number] 变量时可能会丢失精度。

### String.prototype.matchAll()
matchAll()  方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
```js
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];
console.log(array[0]);  // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```

### Promise.allSettled()
我们都知道 Promise.all() 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise直接进入reject 状态。

场景：现在页面上有三个请求，分别请求不同的数据，如果一个接口服务异常，整个都是失败的，都无法渲染出数据

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，这就是Promise.allSettled的作用
```js
// Promise.allSettled 不管有没有错误，三个的状态都会返回
Promise.allSettled([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res);  
    // 打印结果 
    // [
    //    {status: 'fulfilled', value: 'promise1'}, 
    //    {status: 'fulfilled',value: 'promise2'},
    //    {status: 'rejected', reason: 'error promise3 '}
    // ]
  })
  .catch((error) => {
    console.log("error", error); 
  });
```

### Dynamic Import（按需 import）
import()可以在需要的时候，再加载某个模块。
```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```
上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

### **ES2021(ES12)**
逻辑运算符和赋值表达式（&&=，||=，??=）
```js
1.&&=
逻辑与赋值 x &&= y等效于：
x && (x = y);
//上面的意思是，当x为真时，x=y。

2.||=
逻辑或赋值（x ||= y）运算仅在 x 为false时赋值。
x ||= y 等同于：x || (x = y);

3.??=
逻辑空赋值运算符 (x ??= y) 仅在 x 是 nullish[3] (null 或 undefined) 时对其赋值。

x ??= y 等价于：x ?? (x = y);
```

### String.prototype.replaceAll()
介绍
replaceAll()  方法返回一个新字符串，新字符串中所有满足 pattern 的部分都会被replacement 替换。pattern可以是一个字符串或一个RegExp，replacement可以是一个字符串或一个在每次匹配被调用的函数。

原始字符串保持不变。

示例
```js
'aabbcc'.replaceAll('b', '.'); // 'aa..cc'
```
使用正则表达式搜索值时，它必须是全局的。
```js
'aabbcc'.replaceAll(/b/, '.');
TypeError: replaceAll must be called with a global RegExp
```
这将可以正常运行:
```js
'aabbcc'.replaceAll(/b/g, '.');
"aa..cc"
```

### 数字分隔符
欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，1000可以写作1,000。

ES2021中允许 JavaScript 的数值使用下划线（_）作为分隔符。
```js
let budget = 1_000_000_000_000;
budget === 10 ** 12 // true
```
这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。


### Promise.any
方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
```js
Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
```
只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。



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

## 2.Fetch API 基本用法（如何取消）
fetch的*优点*：
    1.语法简洁，更加语义化
    2.基于标准 Promise 实现，支持 async/await
    3.更加底层，提供的API丰富（request, response）
    4.脱离了XHR，是ES规范里新的实现方式
    5.fetch中可以设置mode为"no-cors"（不跨域）
    6.fetch可以通过credentials自己控制发送请求时是否带上cookie。

fetch的*缺点*：
    fetch自身并没有提供abort的方法，需要 *AbortController* 去处理中止，实现起来会繁琐一点。并且 AbortController *兼容性不好*
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

以下是取消 Fetch 请求的基本步骤：
```js
const controller = new AbortController();
const { signal } = controller;

fetch("http://localhost:8000", { signal }).then(response => {
    console.log(`Request 1 is complete!`);
}).catch(e => {
    console.warn(`Fetch 1 error: ${e.message}`);
});

// Abort request
controller.abort(); // 取消 fetch
```

在 abort 调用时发生 AbortError，因此你可以通过比较错误名称来侦听 catch 中的中止操作。
```js
}).catch(e => {
    if(e.name === "AbortError") {
        // We know it's been canceled!
    }
});

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
            let timer = null
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
            list: {},
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

## 7. **JS的变量提升（作用域、预编译、执行上下文）**
### 作用域（作用域是静态的）
作用域在代码编写完成时就确定了
### 0.语法分析阶段
    进行词法分析(编译器会先将一连串字符打断成（对于语言来说）有意义的片段)、语法分析(编译器将一个 token 的流（数组）转换为一个“抽象语法树”)。
### 1.预编译阶段
**（执行上下文，指当前执行环境中的变量、函数声明，参数（arguments），作用域链，this等信息。）**
   #### 全局预编译的3个步骤：
    0.创建全局执行上下文
    1.创建 *GO 全局对象*（变量对象是与执行上下文相关的数据作用域，存储了上下文中定义的变量和函数声明。）。
    2.开始预编译（预编译分为全局预编译和局部预编译，全局预编译发生在页面加载完成时执行，而局部预编译发生在函数执行的前一刻。）
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
    0.创建函数执行上下文
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
    Object.prototype.toString(null) => '[object null]' 
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
        let obj = Object.create({})
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

## 11.**闭包**(普通函数闭包中的this)
闭包是指有权访问另外一个函数作用域中的变量的函数。保持对它的引用。
*优点：* 
      1.保护函数内部变量的安全，加强了封装性 
      2.在内存中维持一个变量 
      3.设计私有方法和变量
      4.可以读取函数内部的变量 
*缺点：*
      1.导致*内存泄漏*，使用不当会造成额外的内存占用 
      2.可以改变父函数的变量，所以使用时要谨慎
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


## 12.*数组扁平化*（ES6自带和自己实现）与*数组去重*
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
   #### 三、toString
```js
const arr = [1, 2, 3, [4, 5, [6, 7]]];
const flatten = arr.toString().split(',');
```
优点：简单，方便，对原数据没有影响 
缺点：最好数组元素全是数字或字符，不会跳过空位



   #### 四、join
```js
const arr = [1, 2, 3, [4, 5, [6, 7]]];
const flatten = arr.join(',').split(',');
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


## 13.**浅拷贝和深拷贝**
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

   ### 一、defer属性<script defer src="script.js"></script>(延迟执行)
   HTML 4.01为 <script>标签定义了defer属性（延迟脚本的执行）。
其用途是：表明脚本在执行时不会影响页面的构造，浏览器会立即下载，但*延迟执行*，即脚本会被延迟到整个页面都解析完毕之后再执行。
   ### 二、async属性<script async src="script.js"></script>
    添加此属性后，脚本和HTML将一并加载（异步），代码将顺利运行。
    与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。
   
   ### 加载顺序
   defer 与相比普通 script，有两点区别：载入 JavaScript 文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成之后。 在加载多个JS脚本的时候，*async是无顺序的加载*，而*defer是有顺序的加载*。
   
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
      查找顺序：浏览器自身的域名缓存区查找 => 操作系统的域名缓存区 => 本地的 hosts 文件  => 本地DNS服务器（中国移动...） => 根域名服务器 => 顶级域名服务器（） => 权威DNS服务器（解析服务器），直到找到IP地址，返回ip，然后把它缓存在本地，供下次使用。

  
   ### 2·浏览器向web服务器发送一个http请求,发起TCP连接
    TCP三次握手，四次挥手
   #### 三次握手（为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误）
    ·第一次握手：
    客户端发送syn包(Seq=x)到服务器，将标志位SYN置为1，随机产生一个序列号seq=X，发送到服务器，并进入SYN_SEND状态，等待服务器确认；
    ·第二次握手：
    服务器收到syn包后，自己也发送一个包，将标志位SYN和ACK都置为1，确认序号 ack=x+1，随机产生一个自己的序列号 seq =Y,发送到客户端SYN_RECV状态；
    ·第三次握手：
    客户端收到服务器的SYN＋ACK包（检查ack是否为x+1，ACK是否为1）。如果正确则发送一个ACK包，标志位ACK置为1，ack=Y+1。
   
    ！！握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP 连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP 连接都将被一直保持下去。
   ![tcp三次握手](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\tcp三次握手.png)

   #### 四次挥手
    第一次挥手：
    Client发送一个FIN，标志位FIN为1,（seq=u），用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。

    第二次挥手：
    Server收到FIN后，发送一个ACK，标志位 ACK 为1给Client（ack=u+1）,
    Server进入CLOSE_WAIT状态。

    第三次挥手：
    Server发送一个 标志位FIN与标志位ACK为1，（seq=w，ack=u+1）用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。

    第四次挥手：
    Client收到后进入TIME_WAIT状态，接着发送一个标志位ACK为1，（seq=u+1,ack=w+1）给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

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


   ### 3·发送HTTP请求(强缓存与协商缓存)
   ！！！HTTP的端口为80/8080，而HTTPS的端口为443
   发送HTTP请求的过程就是构建HTTP请求报文并通过TCP协议中发送到服务器指定端口,请求报文由请求行，请求抱头，请求正文组成。
   请求方法有: GET, POST, PUT, DELETE, OPTIONS, HEAD。
    **http请求格式：**
    ·请求行：请求方法 URL 协议/版本
    ·请求头(Request Header)
    ·请求正文
    
   #### HTTP缓存
·优点：
 1.减少了冗余的数据传递，节省宽带流量
 2.减少了服务器的负担，大大提高了网站性能
 3.加快了客户端加载网页的速度 这也正是HTTP缓存属于客户端缓存的原因。
·缓存的规则：分为强制缓存和协商缓存（强制缓存的优先级高于协商缓存，若两种皆存在，且强制缓存命中目标，则协商缓存不再验证标识。）
**强制缓存**
浏览器发送请求前，根据请求头的*Expires*(HTTP1.0) 和 *Cache-Control*(HTTP1.1)（中的max-age属性）判断是否命中（包括是否过期）强缓存策略，如果命中，直接从缓存获取资源，并不会发送请求。如果没有命中，则进入下一步。
    
**协商缓存**
没有命中强缓存规则，浏览器会发送请求，先从缓存数据库拿到一个缓存的标识，然后向服务端验证标识是否失效，如果没有失效服务端会返回304，直接去拿缓存数据，如果失效，服务端会返回新的数据。

对于协商缓存来说，介绍它的两种缓存方案：
*response header的设置*
```js
etag: '5c20abbd-e2e8'
last-modified: Mon, 24 Dec 2018 09:49:49 GMT
```
*·Last-Modified*（服务器在响应请求时，会告诉浏览器资源的最后修改时间。）

*·Etag*（服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识(文件hash，生成规则由服务器决定)

*request header的设置*
```js
if-none-matched: '5c20abbd-e2e8'
if-modified-since: Mon, 24 Dec 2018 09:49:49 GMT
```
*if-Modified-Since:*浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间。服务端收到此请求头发现有if-Modified-Since，则与被请求资源的最后修改时间进行对比，如果一致则返回304和响应报文头，浏览器只需要从缓存中获取信息即可。


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
        ·解析HTML形成*DOM树*：渲染引擎解析HTML文档，生成内容树
        ·解析CSS会产生CSS规则树
        ·浏览器引擎通过 DOM Tree 和 CSS Rule Tree 来构建*渲染树 Rendering Tree*
        ·*布局渲染树*: render tree：从根节点递归调用
        ·*绘制渲染树*: 遍历渲染树，最后通过调用操作系统Native GUI的API绘制
        ·页面在首次加载时必然会经历reflow和repain：（重绘不一定回流，回流一定会重绘）
            *回流：*当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程。
            *重绘：*当页面中元素样式的改变并不影响它在文档流中的位置时(color、background-color),浏览器会将新样式赋予给元素并重新绘制它。
        （*构建DOM*：
        1.将字符串转换成Token，例如：<html>、<body>等。Token中会标识出当前Token是“开始标签”或是“结束标签”亦或是“文本”等信息。
        2.生成节点对象并构建DOM，一边生成Token一边消耗Token来生成节点对象
        3.渲染树只会包括需要显示的节点和这些节点的样式信息，如果某个节点是 display: none 的，那么就不会在渲染树中显示。
        4.渲染过程中，如果遇到<script>就停止渲染，执行 JS 代码。因为浏览器有GUI渲染线程与JS引擎线程，为了防止渲染出现不可预期的结果，这两个线程是互斥的关系。
        5.如何减少回流、重绘
        ·使用 transform 替代 top
        ·使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
        ·不要把节点的属性值放在一个循环里当成循环里的变量。
        6.性能优化策略
        基于上面介绍的浏览器渲染原理，DOM 和 CSSOM 结构构建顺序，初始化可以对页面渲染做些优化，提升页面性能。
        JS优化： <script> 标签加上 defer属性 和 async属性 用于在不阻塞页面文档解析的前提下，控制脚本的下载和执行。
        defer属性： 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
        async属性： HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。
        7.CSS优化： <link> 标签的 rel属性 中的属性值设置为 preload 能够让你在你的HTML页面中可以指明哪些资源是在页面加载完成后即刻需要的,最优的配置加载顺序，提高渲染性能
        ）

   ### 7.浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）
    其实这个步骤可以并列在步骤8中，在浏览器显示HTML时，它会注意到需要获取其他地址内容的标签。这时，浏览器会发送一个获取请求来重新获得这些文件。比如我要获取外图片，CSS，JS文件等，类似于下面的链接：

   ### 8·连接结束


## 18.**浏览器事件循环**
1.Js在执行一段代码时候 首先会在*主进程创建一个执行栈* 然后*创建一个上下文*push到执行栈。当函数执行的时候，也创建一个上下文push到执行栈，当执行栈执行完成后，就会从栈中弹出。当*遇到异步任务*时，就将其*放入任务队列*中，等待当前执行栈所有同步代码执行完成之后，就会从异步任务队列中取出已完成的异步任务的回调并将其放入执行栈中继续执行。
2.*同步任务*会在调用栈中*按照顺序*等待主线程依次执行，异步任务会在同步任务执行完，调用栈被清空后，从 Event Queue 读取到执行栈执行。
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


## 19.**手写 Promise(then与catch的返回值问题)**
catch为then的语法糖，它是then(null,rejection)的别名，也就是说catch也是then,它用于捕获错误，它的参数也就是then的第二个参数，所以，假设catch中如果return值的话，新的promise对象也会是接受状态（即resolve）。

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
                this.status = RESOLVE
                this.value = value
                //调用resolve时遍历函数
                this.onFulfilledCallback.forEach(cb => cb)
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECT
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

## 20.**手写 Promise.all** 和 Promise.race
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


## 21.**手写 filter,Map,Reduce 方法**
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

## 34.**原生ajax**
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
0：是uninitialized，已经创建了XMLHttpRequest对象但是未初始化。（还没调用open方法）。
1：是loading.已经开始准备好要发送了。（未调用send方法）
2：已经发送，但是还没有收到响应。
3：正在接受响应，但是还不完整。
4：接受响应完毕。


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
   结合 借用构造函数 传递参数和 寄生模式 实现继承，这是最成熟的方法，也是现在库实现的方法
   这个例子的高效率体现在它只调用了一次 SuperType构造函数，并且因此避免了在SubType.prototype上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用instanceof和isPrototypeOf()
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
|        | 遍历出数组的*原型对象*   | *不会*遍历出原型对象   |
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

## **43.实现promise retry重试**
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

## 44.从 Promise、Async/Await 、Generator等角度实现一个 sleep 函数
一、传统方法，回调函数
```js
// 利用回调函数
function sleep(callback,time) {
  if(typeof callback === 'function') {
     setTimeout(callback,time)
  }
 }
function output(){
    console.log(1);
}
sleep(output,1000);
```

二、从Promise方面进行实现
```js
// Promise
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  })
}
 
sleep(5000).then(() => {
    console.log('业务代码') 
})
```

三、从async/await进行实现
```js
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  })
}
async function sleepAsync () {
    await sleep(5000);
    console.log('业务代码')
}
sleepAsync()
```

四、从Generator 配合yield进行实现
```js
//Generator
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  })
}
function* sleepGenerator(time) {
    yield sleep(time);
}
sleepGenerator(5000).next().value.then(()=>{
    console.log('业务代码')
})
``` 

## 45.使用setTimeout实现setInterval方法
```js
function mysetinterval(fn,time){
    console.log("利用setTimeout实现setInterval");
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
        if(str[i]==" "){
            start=i
        }else{
            break
        }
    }
    for(let i =len-1; i>0; i--){
        if(str[i]==" "){
           end=i+1
        }else{
            break
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

## 58.e.target 和 e.currentTarget 区别
1.e.target
触发事件的对象 (某个DOM元素) 的引用。当事件处理程序在事件的冒泡或捕获阶段被调用时，它与event.currentTarget不同。
event.target 属性可以用来*实现事件委托* (event delegation)。

2.e.currentTarget
返回绑定事件的元素
当事件遍历DOM时，接口的currentTarget只读属性Event标识事件的当前目标。它*始终引用事件处理程序附加到的元素*，而不是Event.target标识事件发生的元素。

## **59.CommonJs(require)和es6的Module( import)的区别？**
1. 两者的模块导入导出语法不同，*CommonJS 的标准* 是 module.exports/exports导出，require导入；ES6则是 export 导出，import导入。
2. commonjs是运行时加载模块（require 是*赋值过程*并且是**运行时才执行**，也就是同步加载）。ES6是在静态编译期间就确定模块的依赖（import 是*解构过程*并且是**编译时执行，输出接口**，理解为异步加载）。
3.import/export 是 *ES6 的标准*，通常适用范围如 React
5.ES6在编译期间会将所有*import提升到顶部*，commonjs不会提升require。
6.commonjs导出的是一个*值拷贝*，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ES6是导出的一个*值引用*，内部修改可以同步到外部。
7. commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined。

*require和import的性能*
require 的性能相对于 import 稍低。
因为 require 是在运行时才引入模块并且还赋值给某个变量，而 import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高

## 60.javascript 实现一个**带并发限制的异步调度器**，保证同时最多运行2个任务
```js
 class Scheduler {
        constructor(limit) {
            this.limit = limit
            this.queue = [] // 待运行的任务
            this.count = 0  //计数
        }
        // promiseTask 是一个异步函数，return Promise
        add(promiseTask) {
            return new Promise((resolve, reject) => {
                promiseTask.resolve = resolve
                promiseTask.reject = reject
                this.queue.push(promiseTask)
                this.start()
            })
        }

        start() {
            if (this.count < this.limit) {
                this.count++
                const task = this.queue.shift()
                task().then((res) => {
                    task.resolve(res)
                })
                    .catch(err => {
                        task.reject(err)
                    }).finally(() => {
                        this.count--
                        this.start()
                    })
            }

        }
    }

    //测试
    const timeout = (time) => new Promise(resolve => {
        setTimeout(resolve, time)
    })
    const scheduler = new Scheduler(2)
    const addTask = (time, order) => {
        scheduler.add(() => timeout(time)).then(() => console.log(order))
    }
    addTask(1000, '1')
    addTask(500, '2')
    addTask(300, '3')
    addTask(400, '4')

```

## 61. 异步请求缓存，怎么保证当前ajax请求相同资源时，真实网络层中，实际只发出一次请求
缓存的时候去重，去重的标准是，url相同，method相同，data相同，headers相同，可以根据实际情况优化标准

## 62.判断是安卓还是ios手机 来实施兼容
//window.navigator.userAgent 原生js 可以拿到是什么手机系统
```js
var ua = window.navigator.userAgent.toLowerCase()

var isIos =(ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1)
if( isIos){
    //做 ios 的兼容代码 
}else {
   
}
```

## 63.**如何提高首频加载速度**
1.js外联文件放到body底部，css外联文件放到head内
2.http静态资源尽量用多个子域名(http静态资源尽量用多个子域名)
3.服务器端提供html和http静态资源时最好开启gzip
4.在js,css,img等资源响应的http headers里设置expires,last-modified
5.尽量减少http requests的数量
6.js/css/html/img资源压缩
7.使用css spirtes，可以减少img请求次数(利用css sprites技术，结合background的定位在同一张图片中加载多个图片)
8.大图使用lazyload懒加载
9.避免404，减少外联js
10.减少cookie大小可以提高获得响应的时间
11.减少dom elements的数量
12.使用异步脚本，动态创建脚本

## 64.css中link与@import的区别
（1）link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;
（2）页面被加载的时，link会*同时被加载*，而@import引用的CSS会*等到页面被加载完再加载*;
（3）import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;
 (4)link支*持使用js控制*DOM去改变样式，而@import不支持;


## 65.WeakMap
WeakMap 与 Map的区别有两点：
    WeakMap 对象是键/值对的集合，*键*被*弱引用*。*键必须是对象*。
    WeakMap 的键名所指向的对象，不计入垃圾回收机制

·WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。
·WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即*垃圾回收机制不将该引用考虑在内*


## 66.HTML5原生拖拽/拖放 Drag & Drop 详解
文本只有在被选中的情况下才能拖放。如果显示设置文本的draggable属性为true，按住鼠标左键也可以直接拖放。
draggable属性：设置元素是否可拖动。
语法：<element draggable="true | false | auto" >
            true: 可以拖动  
            false: 禁止拖动  
            auto: 跟随浏览器定义是否可以拖动

拖动每一个可拖动的元素，在拖动过程中，都会经历三个过程，拖动开始-->拖动过程中--> 拖动结束。
*dragstart*   在元素开始被拖动时候触发
*drag*   在元素被拖动时反复触发
*dragend*   在拖动操作完成时触发
*dragenter*   当被拖动元素进入目的地元素所占据的屏幕空间时触发
*dragover*   当被拖动元素在目的地元素内时触发
*dragleave*   当被拖动元素没有放下就离开目的地元素时触发


## 67.**axios（并发请求，cancelToken取消请求原理）**
通过调用CancelToken的构造函数来实现取消请求主要分为两步：
    1.调用CancelToken构造函数创建cancelToken实例对象，并创建一个 cancel函数
    2.调用cancel函数，取消请求

使用代码如下：
```js
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel('Operation canceled by the user.');
```

**执行多个并发请求**
```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```


*执行cancel取消请求的过程如下：*
![axios-cancelToken](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\axios-cancelToken.png)
**小结**
当用户调用内部对外暴露的cancel方法后，axios内部会执行resolvePromise，改变promise(CancelToken实例的promise)的状态，触发promise的then回调，然后执行onCanceled方法，在onCanceled中则调用XMLHttpRequest 的abort方法取消请求，同时调用reject让外层的promise失败。


## 68. 如何判断当前脚本运行在浏览器还是node环境中？（阿里）
this === window ? 'browser' : 'node';

## 69.**如何防范CSRF攻击，XSS攻击**
#### XSS（跨站脚本攻击）攻击的防范
```
1、HttpOnly 防止劫取 Cookie
2、输入检查-不要相信用户的所有输入
3、输出检查-存的时候转义或者编码
```

#### CSRF（跨站请求伪造）攻击的防范
```
1、验证码
2、Referer Check
3、添加token验证
```
参考出处： [juejin.im/entry/68449…](https://juejin.im/entry/6844903638532358151)

## 70.**浏览器是如何解析html的**（css会不会阻塞DOM渲染）？
 *dom解析过程*
整个dom的解析过程是顺序，并且渐进式的。
顺序指的是从第一行开始，一行一行依次解析；渐进式则指得是浏览器会迫不及待的将解析完成的部分显示出来，如果我们做下面这个实验会发现，在断点处第一个div已经在浏览器渲染出来了

*css加载不会阻塞DOM树的解析*
*css加载会阻塞DOM树的渲染*
*css加载会阻塞后面js语句的执行*

*JS会阻塞DOM解析和渲染。*
JavaScript 既可以读取和修改 DOM 属性，又可以读取和修改 CSSOM 属性。


*阻塞型*
会阻塞dom解析的资源主要包括：
    ·内联css
    ·内联javascript
    ·外联普通javascript
    ·javascript标签之前的外联css

*非阻塞型*
不阻塞dom解析的资源主要包括：
    ·javascript标签之后的外联css
    ·image
    ·iframe

## 71.*ES6模板字符串的实现原理*
```js
// 定义一个字符串
    function render(template, context) {
        return template.replace(/$\{\{(.*?)\}\}/g, (match, key) => context[key]);
    }
    const template = "${{name}}很厉name害，才${{age}}岁";
    const context = { name: "jawil", age: "15" };
    console.log(render(template, context));
```

## 72.移动端html标签几个体验优化
```css
html,body{
    overflow: hidden;/*手机上写overflow-x:hidden;会有兼容性问题，如果子级如果是绝对定位有运动到屏幕外的话ios7系统会出现留白*/
    -webkit-overflow-scrolling:touch; /*流畅滚动,ios7下会有滑一下滑不动的情况，所以需要写上*/
    position:realtive;/*直接子级如果是绝对定位有运动到屏幕外的话，会出现留白*/
}

```

## 73.requestAnimationFrame（实现获取每秒的帧数）
RAF主要是按照显示器的刷新频率（60Hz 或者 75Hz）对页面进行重绘，大概按照这个刷新频率同步重绘页面，就是大概1s最多重绘60次或者75次的频次
window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

*注意：*若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()
requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
```js
// 实现获取每秒的帧数
  <script>
    let count = 0
    let pretime = Date.now()
    function animloop() {
        let now = Date.now()
        if (now - pretime > 1000) {
            console.log(now - pretime);
            return false;
        }
        count += 1
        console.log(count);
        requestAnimationFrame(animloop)
    }
    requestAnimationFrame(animloop)
</script>
```

## 74.js报错类型（6种错误类型）**(栈溢出是 rangerError)**
js中的控制台的报错信息主要分为两大类:
第一类是*语法错误*，这一类错误在预解析的过程中如果遇到，就会导致整个js文件都无法执行。
第二类错误统称为*异常*，这一类的错误会导致在错误出现的那一行之后的代码无法执行，但在那一行之前的代码不会受到影响。

**1.SyntaxError 语法错误**
```js
// SyntaxError: 
// 1) 变量名不符合规范
var 1       // Uncaught SyntaxError: Unexpected number
var 1a       // Uncaught SyntaxError: Invalid or unexpected token
// 2) 给关键字赋值
function = 5     // Uncaught SyntaxError: Unexpected token =

```

**2.ReferenceError 引用错误(要用的变量没找到)**
```js
// ReferenceError：引用错误(要用的变量没找到)
// 1) 引用了不存在的变量
a()       // Uncaught ReferenceError: a is not defined
console.log(b)     // Uncaught ReferenceError: b is not defined
// 2) 给一个无法被赋值的对象赋值
console.log("abc") = 1   // Uncaught ReferenceError: Invalid left-hand side in assignment
```

**3.TypeError: 类型错误(调用不存在的方法)**
```js
// TypeError: 类型错误(调用不存在的方法)
// 变量或参数不是预期类型时发生的错误。比如使用new字符串、布尔值等原始类型和调用对象不存在的方法就会抛出这种错误，因为new命令的参数应该是一个构造函数。
// 1) 调用不存在的方法
123()        // Uncaught TypeError: 123 is not a function
var o = {}
o.run()        // Uncaught TypeError: o.run is not a function
// 2) new关键字后接基本类型
var p = new 456      // Uncaught TypeError: 456 is not a constructor

```


**4.RangeError: 范围错误(参数超范围)**
```js
// RangeError: 范围错误(参数超范围)
// 主要的有几种情况，第一是数组长度为负数，第二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
// 1) 数组长度为负数
[].length = -5      // Uncaught RangeError: Invalid array length
// 2) Number对象的方法参数超出范围
var num = new Number(12.34)
console.log(num.toFixed(-1))   // Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
// 说明: toFixed方法的作用是将数字四舍五入为指定小数位数的数字,参数是小数点后的位数,范围为0-20.

```

**5.EvalError: 非法调用 eval()**
```js
// EvalError: 非法调用 eval()
// 在ES5以下的JavaScript中，当eval()函数没有被正确执行时，会抛出evalError错误。例如下面的情况：
var myEval = eval;
myEval("alert('call eval')");
// 需要注意的是：ES5以上的JavaScript中已经不再抛出该错误，但依然可以通过new关键字来自定义该类型的错误提示。以上的几种派生错误，连同原始的Error对象，都是构造函数。开发者可以使用它们，认为生成错误对象的实例。
new Error([message[fileName[lineNumber]]])
// 第一个参数表示错误提示信息，第二个是文件名，第三个是行号。
```


**6.URIError: URI不合法**
```js
// 主要是相关函数的参数不正确。
decodeURI("%")     // Uncaught URIError: URI malformed at decodeURI
```

## 75.babel是怎么解析语法的吗？(词法分析和语法分析的作用？)
babel 是 source-to-source 的转换，整体编译流程分为三步：
    *1.parse（解析）*：通过 parse 把源码转换成 AST
        当前解析阶段主要分为两个步骤：*词法分析* 和 *语法分析*:
        *1.词法分析:*将代码字符串转换成Token流（即将源码分割成最小单元），可以将Token流理解成一种扁平的语法片段数组，数组中的每一项都有一组属性来描述该Token。
        代码中的语法单元主要包括以下几类：关键字(let、const等)、标识符、运算符、数字、空格、注释；
        *2.语法分析:*该阶段会将Token流转换为AST形式，将Token中的描述属性添加到AST语法结构中，方便后期操作语法树。
    *2.transform（转换）*：遍历 AST，调用各种 transform 插件对 AST 进行增删改
        该步骤实现了对AST语法树的遍历，对AST节点的操作，包括增加、删除、修改等，此时就需要一系列具备相应功能的插件来进行转换操作，例如ES6转ES5、jsx语法转js等；
        当源代码通过@babel/parser 转换成AST后，通过配置一系列的plugins和presets转换成新的AST语法。
    *3.generate（生成）*：
    在transform阶段实现的是对ast代码节点的替换和重组，接下来进入generat阶段，@babel/generator模块是代码生成器，把最终（经过一系列转换之后）的 AST 转换成目标代码和创建 sourcemap 源码映射。


const const a=1;词法分析能通过吗？是到语法分析才报错吗？

## 76.单页和多页应用怎么通讯
*单页：*因为在一个页面内，页面间传递数据很容易实现(这里是我补充，父子之间传值，或vuex或storage之类)
*多页：*页面间传递数据	依赖 URL、cookie或者localstorage，实现麻烦
	

## 77.**前端性能监控和埋点**
1、白屏时间：从浏览器输入地址并回车后到页面开始有内容的时间；
2、首屏时间：从浏览器输入地址并回车后到首屏内容渲染完毕的时间；
3、重要页面的http请求时间
4、重要页面的渲染时间
5、首屏加载时长
6、用户可操作时间节点：domready触发节点，点击事件有反应；
7、总下载时间：window.onload的触发节点。
8、静态资源的时间计算（*window.performance.getEntries()*，用来统计静态资源相关的时间信息）

### **白屏时间**
在html文档的head中所有的静态资源以及内嵌脚本/样式之前记录一个时间点，在head最底部记录另一个时间点，两者的差值作为白屏时间
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>白屏时间</title>
    <script>
        // 开始时间
        window.pageStartTime = Date.now();
    </script>
    <link rel="stylesheet" href="">
    <link rel="stylesheet" href="">
    <script>
        // 白屏结束时间
        window.firstPaint = Date.now()
    </script>
</head>
<body>
    <div>123</div>
</body>
</html>

白屏时间 = firstPaint - pageStartTime

```

### **首屏时间**
首屏时间 = 白屏时间 + 首屏渲染时间

```js
//由于浏览器解析HTML是按照顺序解析的，当解析到某个元素的时候，觉得首屏完成了，就在此元素后面加入<script>计算首屏完成时间
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首屏时间</title>
    <script>
        // 开始时间
        window.pageStartTime = Date.now();
    </script>
    <link rel="stylesheet" href="">
    <link rel="stylesheet" href="">
</head>
<body>
    <div>123</div>
    <div>456</div>
    // 首屏可见内容
    <script>
        // 首屏结束时间
        window.firstPaint = Date.now();
    </script>
    // 首屏不可见内容
    <div class=" "></div>
</body>
</html>

首屏时间 = firstPaint - pageStartTime

```

### **可操作时间**
```js
用户可操作的时间节点即dom ready触发的时间，使用jquery可以通过$(document).ready()获取此数据。
// 原生JS实现dom ready
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

### **Performance**
通过Performance 我们便能拿到DNS 解析时间、TCP 建立连接时间、首页白屏时间、DOM 渲染完成时间、页面 load 时间等，等等
```js
//拿到Performance并且初始化一些参数
let timing = performance.timing,
    start = timing.navigationStart,
    dnsTime = 0,
    tcpTime = 0,
    firstPaintTime = 0,
    domRenderTime = 0,
    loadTime = 0;
//根据提供的api和属性，拿到对应的时间
dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
tcpTime = timing.connectEnd - timing.connectStart;
firstPaintTime = timing.responseStart - start;
domRenderTime = timing.domContentLoadedEventEnd - start;
loadTime = timing.loadEventEnd - start;

console.log('DNS解析时间:', dnsTime, 
            '\nTCP建立时间:', tcpTime, 
            '\n首屏时间:', firstPaintTime,
            '\ndom渲染完成时间:', domRenderTime, 
            '\n页面onload时间:', loadTime);
```

## 78.toLocaleString(可以给数字做每三位加一个逗号)
```js
/*
    toLocaleString( locale, opt ions )妙用
        locale: 字符串，用于指定本地环境中存在的语言类型
        options:对象， 附加选项，用来指定字符串的显示格式
    */
   
    // 1. toLocaleString() 数字分割// 123, 456.123
    const numOne = 123456.123;
    console.log(numOne.toLocaleString());


    // 2. toLocaleString()数字转为百分比// 12%
    const numTwo = 0.12;
    console.log(numTwo.toLocaleString('zh', { style: 'percent' }));

    // 3. toLocaleString() 数字转为货币表示法//￥1,000, 000.00 CNY 1, 000,000.00 1, 000 , 000.00人民币
    const numThree = 1000000;
    console.log(numThree.toLocaleString('zh', { style: 'currency', currency: 'cny' }))
    console.log(numThree.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'code' }))
    console.log(numThree.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: "name" }))
```

## 79.<a>标签添加属性 download ，点击链接之后会下载资源，而不是打开新网页

## 80.JavaScript parseInt()的用法
parseInt方法接收两个参数，parseInt(string，radix?)；
string：要被解析的值。如果参数不是一个字符串，则将其转换为字符串(toString)。字符串开头的空白符将会被忽略。
radix：可选。从 2 到 36，表示被解析的值的进制。例如说指定 10 就等于指定十进位。
### 1.基本用法，只接受一个参数，可以当做第二个参数默认是10。parseInt的返回值只有两种可能，不是一个十进制整数，就是NaN。
*a.将字符串转为整数。*
```js
parseInt('123'); // 123
```

*b.如果字符串头部有空格，空格会被自动去除。*
```js
parseInt('  81'); // 81
```
*c.如果parseInt的参数不是字符串，则会先转为字符串再转换。这个很重要*

*d1.字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。*
*d2.parseInt会把小数转化成整数。因为碰到非数字就停止,碰到小数点就相当于截取到前面已读到的数字。*
```js
parseInt('99aa'); // 99
parseInt(99.123)   //99()
```

*e.如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN。*
```js
parseInt('aa99'); // NaN
parseInt('-99'); // -99
```

*f.如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析。*
```js
parseInt('0x10'); // 16
```

*g.如果字符串以0开头，将其按照10进制解析。*
```js
parseInt('011') // 11
```

*h.如果参数以0开头，但不是字符串，则会先将数值转成字符串，然后解析，见规则c；*
```js
parseInt(011); // 9
```
// 解释一下，(011).toString()得到的结果是‘9’

*i.对于那些会自动转为科学计数法的数字，parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。*
```js
parseInt(1000000000000000000000.5); // 1
// 等同于
parseInt('1e+21'); // 1
 
parseInt(0.0000008); // 8
// 等同于
parseInt('8e-7'); // 8
```
 

### 2.进制转换（接收两个参数）
parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制。
a.第一个参数解析规则参照第一条基本用法
b.如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回NaN。如果第二个参数是0、undefined和null，则直接忽略。
```js
parseInt(“19”, 10); // 19 (10+9)
parseInt(“11”, 2); // 3 (2+1)
parseInt(“1f”, 16); // 31 (1*16^1+f*16^0)
 
parseInt('-99', null); // -99
parseInt('-99', undefined); // -99
parseInt('-99', 0); // -99
```

## 81.美团前端笔试题、**实现一个compose高阶函数**
### 1．什么是compose函数?
compose函数可以将嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。例如: fn2(fn1(10))2．典型应用场景:
*1. Redux的中间件就是用compose实现的*
```js
export default function applyMiddleware( . ..middlewares) {
const chain = middlewares.map(middleware => middleware(middlewareAPI))
    //接着 compose 将 chain 中的所有匿名函数，组装成一个新的函数，即新的 dispatch
    dispatch = compose(...chain)(store.dispatch)
}
```

*2. Webpack中loader的加载顺序也是从右往左，也是compose实现的。*
```js
//编译less文件
[ 'style-loader ' , ' css-loader ' , 'less-loader ']
const contentStr = compose(...loaders)(源文件)
```

### 实现compose和pipe
```js
    //从右往左迭代
    function compose(...fns) {
        return arg => fns.reduceRight((prev, cur) => {
            return cur(prev)
        }, arg)
    }
   //从左往右迭代
    function pipe(...fns){
        return arg=>fns.reduce((prev,cur)=>{
            return cur(prev)
        },arg)
    }
```
*案例*
```js
    //加法函数
    const add = x => x + 6
    //乘法函数
    const multiply = x => x * 6

    console.log(compose(multiply, add)(10)); //96
    console.log(pipe(multiply, add)(10)); //66
```

## *六种数据类型转Number规则：*
1、Number转Number，本来多少就是多少；
2、String转Number：数字字符串转成对应数字，空字符串转为0，其他均为NaN；
3、Boolean转Number：true为1，false为0；
*4*、null为 0，undefined为 NaN；
*5*、Object（包括对象、函数、数组、正则等）转Number调用其 valueOf() 方法，如果为NaN，调用toString（）方法，如果还是NaN，则结果为NaN。
*valueOf() 方法可返回 String 对象的原始值。*
```js
string.valueOf()
注意： valueOf() 方法通常由 JavaScript 在后台自动进行调用，而不是显式地处于代码中。
```

null与undefined在与其他数相等运算时不进行类型转换，
null与undefine单独与别的值比较都为false,但undefined为null的衍生对象，所以两个比较为true
```js
console.log(null==false) //false
console.log(null==undefined)//true
```

## **100.前端性能优化 （performance，DNS预查询）**
  ### performance（在浏览器F12打开或js的 API ）
![performance](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\performance(1).png)
![performance2](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\performance(2).png)
可以使用 *window.performance.Navigation.timing* 统计到的时间数据来计算一些页面性能指标，比如DNS查询耗时、白屏时间、domready等等。如下:
. *DNS查询耗时*= domainLookupEnd - domainLookupStart
. *TCP链接耗时*= connectEnd - connectStart
. request请求耗时= responseEnd - responseStart
· *解析dom树耗时*= domComplete - domInteractive
· 白屏时间= domloadng - fetchStart
. domready时间= domContentLoadedEventEnd - fetchStart 
. onload时间= loadEventEnd - fetchStart
  
  ### DNS预查询（<link rel="dns-prefetch" href=''）

DNS查询
与服务器交互首先要进行DNS查询，得到服务器的IP地址，浏览器会首先查询自己的缓存，之后会查询本地HOSTS，如果仍然没找到会发起向DNS服务器查询的请求。

进行DNS预查询
在文档顶部我们可以将我们即将要请求的地址的DNS预先查询，通过插入一个link标签
<link rel="dns-prefetch" href="https://fonts.googleapis.com/">
来告知浏览器我们将要从这个地址(通常会是存放静态资源的CDN的地址，)拉取数据了，你先查询一下，当用到的时候就可以直接拿到对应的IP。
  
  ### 建立HTTP(TCP)连接（缓存）
得到服务器IP之后，首先进行三次握手，之后会进行SSL握手(HTTPS)，SSL握手时会向服务器端确认HTTP的版本。

*·keep-alive*
由于TCP的可靠性，每条独立的TCP连接都会进行一次三次握手，从上面的Network的分析中可以得到握手往往会消耗大部分时间，真正的数据传输反而会少一些(当然取决于内容多少)。HTTP1.0和HTTP1.1为了解决这个问题在header中加入了*Connection: Keep-Alive*，keep-alive的连接会保持一段时间不断开，后续的请求都会复用这一条TCP，不过由于管道化的原因也会发生队头阻塞的问题。
HTTP1.1默认开启Keep-Alive，HTTP1.0可能现在不多见了，如果你还在用，可以升级一下版本，或者带上这个header。

  
  ### 使用HTTP2(*Expires*和*Cache-Control*)
HTTP2相对于HTTP1.1的一个主要升级是多路复用，多路复用通过更小的二进制帧构成多条数据流，交错的请求和响应可以并行传输而不被阻塞，这样就解决了HTTP1.1时复用会产生的队头阻塞的问题，同时HTTP2有首部压缩的功能，如果两个请求首部(headers)相同，那么会省去这一部分，只传输不同的首部字段，进一步减少请求的体积。

HTTP缓存主要分为两种，一种是强缓存，另一种是协商缓存，都通过Headers控制。
![http缓存](C:\Users\Lenovo\Desktop\JsVueReact复习\photo\http缓存.png)
*·强缓存*
强缓存根据请求头的*Expires*和*Cache-Control:max-age=100000*判断是否命中强缓存，命中强缓存的资源直接从本地加载，不会发起任何网络请求。
*Expires*和*Cache-Control*的不同之处：
Expires是http1.0特性，比Cache-control（1.1）要早，因此有些缺陷。由于失效时间是一个绝对时间，所以当客户端本地时间被修改以后，服务器与客户端时间偏差变大以后，就会导致缓存混乱。比如说，服务器时间是2018年4月19号，客户端本来时间是2018年4月10号，但是我手动修改客户端时间为2018年4月20，因此服务器时间和客户端时间有偏差之后，缓存失效，这是不对的。

*·协商缓存*
协商缓存一般会在强缓存过期后发起，向服务器确认是否需要更新本地的缓存文件，如果不需要更新，服务器会返回304否则会重新返回整个文件。
  
  ### CDN
CDN会把源站的资源缓存到CDN服务器，当用户访问的时候就会从最近的CDN服务器拿取资源而不是从源站拿取，这样做的好处是分散了压力，同时也会提升返回访问速度和稳定性。
 
  ### 进行页面渲染（css预加载 preload /预连接内容）
可以将即将要用到的资源或者即将要握手的地址提前告知浏览器让浏览器利用还在解析HTML计算样式的时间去提前准备好。

#### preload
使用link的preload属性预加载一个资源。
```js
<link rel="preload" href="style.css" as="style">
```
as属性可以指定预加载的类型，除了style还支持很多类型，常用的一般是style和script，css和js。

#### prefetch（不常用）
prefetch和preload差不多，prefetch是一个*低优先级的获取*，通常用在这个资源可能会在用户接下来访问的页面中出现的时候。当然对当前页面的要用preload，不要用prefetch，可以用到的一个场景是在用户鼠标移入a标签时进行一个prefetch。


#### preconnect
preconnect和dns-prefetch做的事情类似，提前进行TCP，SSL握手，省去这一部分时间，基于HTTP1.1(keep-alive)和HTTP2(多路复用)的特性，都会在同一个TCP链接内完成接下来的传输任务。

#### script加标记
```js
<script src="main.js" async>

多条js可以并行下载，当js下载完成后会立即(尽快)执行，
多条js不会互相等待，下载期间浏览器会去干其他事(继续解析HTML等)，异步下载，异步执行。

defer标记
<script src="main.js" defer></script>
多条js可以并行下载，不过当js下载完成之后不会立即执行，而是会等待解析完整个HTML之后在开始执行。
多条defer标记的js会按照顺序执行，
```
两个标记都是为了让script标签实现异步下载，主要的区别在于：
async无法保证顺序且下载完就会执行而defer则会等待整个HTML解析之后才会开始执行，并且按照插入的顺序执行。
 
  ###  其他
（1）减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存，图片服务器。
（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
（4） 当需要设置的样式很多时设置className而不是直接操作style。
（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
（6） 避免使用CSS Expression(css表达式)又称Dynamic properties(动态属性)。
（7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。
（8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。


  
  ### 视窗外的内容懒加载
懒加载也是一个经常被提及的技术，视窗外的内容是不会被用户立即看到的，这时加载过多的内容反而拖慢了网站整体的渲染，我们就可以用懒加载推迟这部分内容的加载来达到加速可访问和可交互性的目的，等用户即将到达视窗内的时候再开始加载这部分内容，通常懒加载会与loading和骨架屏等技术搭配使用。
  
  ### 减少无意义的回流
回流与重绘是一个老生常谈的问题，当浏览器大小改变/滚动，DOM增删，元素尺寸或者位置发生改变时都会发生回流，回流意味着浏览器要重新计算当前页面的与之相关的所有元素，重新进行整体的布局。

## 101.generator函数(迭代函数—不常用)
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

## 1001. 2021 年在 Web 领域有哪些关键进展？
*小程序*
MiniApps 指混合移动应用程序，小巧、免安装、加载速度快，使用 Web 技术（尤其是 CSS 和 JavaScript）并与 Native Apps 的功能集成，也就是我们常说的小程序。
MiniApps工作组 今年发布了多个公开草案：
    ·5月11日发布 *MiniApp Manifest*草案：规范为应用程序 manifest 提供了额外的元数据来描述。
    ·6月15日发布 *MiniApp Lifecycle*草案：定义了小程序生命周期的事件与管理小程序及各个小程序页面的生命周期流程。
    ·11月30日发布 *MiniApp Packaging*草案：定义了 MiniApp 打包文件的语义和一致性要求，以及包含 MiniApp 资源文件的单个文件容器结构，包括配置文件、静态页面模版、样式表、JavaScript 文档、媒体文件以及其他资源。

**音频 - Web Audio 1.0**
Web 音频工作组 今年6月份发布 Web Audio API 1.0 为 W3C 正式推荐标准, 为 Web 平台添加了直接从 Web 浏览器操作音乐和创建音频的标准方法，包括协作和交互方式。

目前所有主流浏览器已实现 Web Audio 1.0 规范，支持在浏览器中合成音频。浏览器提供一个 *AudioContext* 对象，该对象用于生成一个声音的上下文，与扬声器相连。
```js
const audioContext = new AudioContext();
```
然后，获取音源文件，将其在内存中解码，就可以播放声音了。
```js
const context = new AudioContext();
fetch('code秘密花园.mp4')
.then(response => response.arrayBuffer())
.then(arrayBuffer => context.decodeAudioData(arrayBuffer))
.then(audioBuffer =>{
// 播放声音
const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
});
```

*Web 文本编辑 - 虚拟键盘API*
Web 文本编辑工作组 在今年8月提交了 虚拟键盘API 公开草案。
VK（Virtual Keyboard）是指在没有硬件键盘的情况下，可用于输入的屏幕键盘。
VirtualKeyboard API 为开发者提供了对虚拟键盘（VK）可见性的更好控制，以及在 VK 可见性改变时调整网页布局的更大能力。


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
