# 0. 圣杯布局 和 双飞翼布局
*圣杯布局*
```html
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            min-width: 390px;
        }
        .center,
        .left,
        .right {
            float: left;
        }
        .container {
            height: 500px;
            padding: 0 200px 0 180px;
            overflow: hidden;
        }
        .center {
            width: 100%;
            height: 500px;
            background-color: red;
            overflow: hidden;
        }
        .left {
            background-color: rgb(76, 224, 62);
            margin-left: -100%;
            position: relative;
            left: -180px;
            width: 180px;
            height: 500px;
        }
        .right {
            background-color: rgb(109, 28, 202);
            margin-right: -200px;
            width: 200px;
            height: 500px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="center">我是center</div>
        <div class="left">我是left</div>
        <div class="right">我是right</div>
    </div>
</body>
```
*双飞翼布局*
```html
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            min-width: 390px;
        }

        .container,
        .left,
        .right {
            float: left;
        }

        .container {
            height: 500px;
            width: 100%;
        }

        .center {
            height: 500px;
            background-color: red;
            margin: 0 200px 0 180px;
        }

        .left {
            background-color: rgb(76, 224, 62);
            margin-left: -100%;
            width: 180px;
            height: 500px;
        }

        .right {
            background-color: rgb(109, 28, 202);
            margin-left: -200px;
            width: 200px;
            height: 500px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="center">我是center</div>
    </div>
    <div class="left">我是left</div>
    <div class="right">我是right</div>
</body>
```

# 1.HTML5新特性、语义化标签
语义化：从标签上即可以直观的知道这个标签的作用，而不是滥用div。
语义化的优点有:
    ·代码结构清晰，易于阅读，利于开发和维护
    ·方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
    ·有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

# 2.css盒子模型
1.content-box（标准盒模型），默认值。元素设置为标准盒模型时，设置的宽高只包含元素内容区的宽高，实际盒子的宽高需要加入内边距（padding）和边框（border）
2.border-box（IE盒模型），默写地方也称怪异盒模型。元素设置为IE盒模型时，设置的宽高包含内边距（padding）和边框（border），实际盒子的宽高就是设置的宽高。实际内容区的大小为设置的宽高-内边距（padding）-边框（border）


# 3.什么是BFC？BFC的布局规则是什么？如何创建BFC？BFC应用？
W3C官方解释为：BFC它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context提供了一个环境，HTML在这个环境中按照一定的规则进行布局。
简单来说就是，BFC是一个*完全独立的空间*（布局环境），让*空间里*的子元素*不会影响*到*外面的布局*。那么怎么使用BFC呢，BFC可以看做是一个CSS元素属性

**怎样触发BFC**
这里简单列举几个触发BFC使用的CSS属性：
    ·overflow: hidden       （overflow的值不为visible的元素；）
    ·display: inline-block
    ·position: absolute
    ·position: fixed
    ·display: flex

**BFC的规则**
·BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列
·BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
·垂直方向的距离由margin决定， 属于同一个BFC的两个相邻的标签外边距会发生重叠
·计算BFC的高度时，浮动元素也参与计算


# 4.DOM、BOM对象
·BOM 是指 浏览器对象模型
可以对浏览器窗口进行访问和操作。开发者可以移动窗口、改变状态栏中的文本以及执行其他与页面内容不直接相关的动作。

·DOM 是指文档对象模型
可以访问HTML文档的所有元素。

# *5.设置3D效果(perspective,transform-style)*
```css
{
//这个属性允许你改变3D元素是怎样查看透视图。加在最外面的包裹3D元素的元素上
 perspective：800px
 //开启3D
 transform-style:preserve-3d
 //写3D代码
 transform:rotateX(45deg)rotateY(45deg);
}
```

# 6.details和summary标签
```js
<details>
        <summary>显示</summary>
        显示的内容
</details>
```

# 7.文字单行显示
```css
p {
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
```

# 8.多行文本溢出隐藏变为...
```css
p {
    overflow:hidden;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient: vertical;
```

# 9.行内元素与块级元素
行内元素：1.不能换行 2.不能设置大小 3.大小由内容决定
块级元素: 1.独占一行 2.可以设置大小 3.宽度继承父元素宽度

# 10.css中的子元素中的百分比（%）到底是谁的百分比
（1）padding
子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。

（2）margin
跟padding一样，margin也是如此，子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的width。

# 11.src和href的区别
·href (Hypertext Reference)指定*网络资源的位置*，从而在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间*定义一个链接或者关系*。
·src (Source)属性仅仅 嵌入当前资源到当前文档元素定义的位置。当浏览器找到在浏览器下载，编译，*执行这个文件之前页面的加载和处理会被暂停*。

# 12.怎么让一个div水平垂直居中

```html
<div class="parent">
    <div class="child"></div>
</div>
```

## 1）使用position + transform，不定宽高时
```css
.parent{
    position: relative;
}
.child{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
```

## 2）使用position + transform，有宽高时
```css
.parent{
    position: relative;
}
.child{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}

```

## 3）使用flex
```css
.parent{
    display: flex;
    align-items: center;
    justify-content: center;
}

```

或者

```css
.parent{
    display: flex;
    align-items: center;
}
.child{
    margin: 0 auto;
}
```

或者

```css
.parent{
    display: flex;
}
.child{
    margin: auto;
}
```

## 4）使用position（四边全为0）(父元素最好有宽高)

```css
.parent{
    position: relative;
}
.child{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

```

## 5）使用grid
```css
.parent{
    display: grid;
}
.child{
    justify-self: center;
    align-self: center;
}

```

## 6）使用table
```css
.parent{
    display: table;
}
.child{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

```

或者

```css
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}

```

7）使用伪类

```css
.parent{
    font-size: 0;
    text-align: center;
}
.parent::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
}
.child{
    display: inline-block;
    vertical-align: middle;
}

```

# 13.左侧宽度固定，右侧自适应的两栏布局
第三种：利用flex
首先，给父容器设置display: flex，然后让右侧div自动放大，撑满剩余空间，设置属性flex: 1 1 auto（也可简写为flex: auto）。
```css
.wrapper {
  border: 1px solid #000;
  display: flex;
}
.left {
  width: 200px;
  height: 200px;
  background-color: rgb(97, 143, 204);
}
.right {
  height: 300px;
  background-color: rgb(165, 103, 207);
  flex: 1 1 auto;
}

```

第四种：利用浮动+BFC
首先让左侧元素浮动，使其脱离文档流。为了让浮动不影响右侧元素，可以使右侧元素形成一个BFC。最简单的就是为右侧元素设置overflow: hidden。
```js
.wrapper {
  border: 1px solid #000;
}
.left {
  width: 200px;
  height: 200px;
  background-color: rgb(97, 143, 204);
  float: left;
}
.right {
  height: 300px;
  background-color: rgb(165, 103, 207);
  overflow: hidden;
}
```

# 14.css 选择器优先级
```js
权重计算规则:
0.第一优先级,!important会覆盖页面内任何位置的元素样式
1.内联样式，如style="color: green"，权值为1000
2.ID选择器，如#app，权值为0100
3.类、伪类、属性选择器，如.foo, :first-child, div[class="foo"]，权值为0010
4.标签、伪元素选择器，如div::first-line，权值为0001
5.通配符、子类选择器、兄弟选择器，如*, >, +，权值为0000
6.继承的样式没有权值
```

# 15.css选择器
```css
1.ID 选择器
2.类选择器
3.标签选择器
4.后代选择器
5.子选择器     >
6.相邻兄弟选择器 element+element（选择紧接在 element元素之后的 element 元素）
7.一般兄弟选择器 element1~element2（选择前面有 element1 元素的每个 elem 元素）
8.伪类选择器（
    :nth-child(n) 孩子选择器
    element:first-child
    element:last-child
    :nth-last-child(n) 倒数第n个子元素
    a:hover             选择鼠标指针位于其上的链接。
    ）
9.伪元素选择器
element::first-line
element::after（在每个element元素的内容之后插入内容。我们可能更多的是用来清除浮动或验证表单提示等其它）
```

# 16.requestAnimationFrame

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

*注意：*若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()
requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
```js
  //requestAnimationFrame效果
    (function animloop() {
        render();
        window.requestAnimationFrame(animloop);
    })();
```

# *17.css动画*
*注意：animation-duration* 属性定义需要多长时间才能完成动画。如果未指定 animation-duration 属性，则动画不会发生，因为默认值是 0s（0秒）
*animation-delay* 属性规定动画开始的延迟时间。
```css
/* 动画代码 */
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}
@keyframes example {
  0%   {background-color: red;}
  25%  {background-color: yellow;}
  50%  {background-color: blue;}
  100% {background-color: green;}
}

/* 向此元素应用动画效果 */
div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
animation-delay: 2s;
}
```



# 19.1.css禁用鼠标事件
```css
.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
```

# 20.3.实现条纹网格的方式
```css
nth-child(even/odd)

// odd表示基数，此时选中基数行的样式，even表示偶数行
.row:nth-child(odd){
    background: #eee;
}
```

```css
nth-of-type(odd)

.row:nth-of-type(odd){
    background: #eee;
}
```

渐变实现linear-gradient
```css
.stripe-bg{
  padding: .5em;
  line-height: 1.5em;
  background: beige;
  background-size: auto 3em;
  background-origin: content-box;
  background-image: linear-gradient(rgba(0,0,0,.2) 50%, transparent 0);
}
```

# 21.css禁止用户选择
```css
body{
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
```








