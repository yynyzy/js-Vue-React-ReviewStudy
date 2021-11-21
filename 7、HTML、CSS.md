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
BFC 是 Block Formatting Context 的缩写，即块格式化上下文。可以看成是一个单独环境，里面的元素不会影响外面的元素。
布局规则：Box是CSS布局的对象和基本单位，页面是由若干个Box组成的。元素的类型和display属性，决定了这个Box的类型。不同类型的Box会参与不同的Formatting Context。
创建：浮动元素 display：inline-block position:absolute
应用: 1.分属于不同的BFC时,可以防止margin重叠 2.清除内部浮动 3.自适应多栏布局

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