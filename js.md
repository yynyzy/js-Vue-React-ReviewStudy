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
            const timer
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
            const timer
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