# 1.HTML5新特性、语义化标签
语义化：从标签上即可以直观的知道这个标签的作用，而不是滥用div。
语义化的优点有:
    ·代码结构清晰，易于阅读，利于开发和维护
    ·方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
    ·有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

# 2.css盒子模型
所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。
CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。
盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

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

# 5.设置3D效果
//这个属性允许你改变3D元素是怎样查看透视图。加在最外面的包裹3D元素的元素上
 perspective：800px
 //开启3D
 transform-style:preserve-3d
 //写3D代码
 transform:rotateX(45deg)rotateY(45deg);

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

# css中的子元素中的百分比（%）到底是谁的百分比
（1）padding
子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。

（2）margin
跟padding一样，margin也是如此，子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的width。

# src和href的区别
·href (Hypertext Reference)指定*网络资源的位置*，从而在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间*定义一个链接或者关系*。
·src (Source)属性仅仅 嵌入当前资源到当前文档元素定义的位置。当浏览器找到在浏览器下载，编译，*执行这个文件之前页面的加载和处理会被暂停*。

# 左侧宽度固定，右侧自适应的两栏布局
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